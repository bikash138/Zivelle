-- 1. Add the column (empty for now)
ALTER TABLE "Item"
ADD COLUMN "searchVector" tsvector;

-- 2. Fill existing rows
UPDATE "Item"
SET "searchVector" = to_tsvector('english', title || ' ' || category);

-- 3. Create trigger function
CREATE FUNCTION item_search_vector_trigger() RETURNS trigger AS $$
BEGIN
  NEW."searchVector" := to_tsvector('english', NEW.title || ' ' || NEW.category);
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- 4. Attach trigger to table (fires on INSERT or UPDATE)
CREATE TRIGGER tsvectorupdate
BEFORE INSERT OR UPDATE OF title, category ON "Item"
FOR EACH ROW EXECUTE FUNCTION item_search_vector_trigger();

-- 5. Add GIN index
CREATE INDEX item_search_idx
ON "Item"
USING GIN ("searchVector");
