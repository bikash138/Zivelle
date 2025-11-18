import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { Loader2, Trash2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { FieldErrors, UseFormSetValue } from 'react-hook-form'
import { z } from 'zod'
import { ListItemSchema } from '@repo/zod/zodTypes'
import Image from 'next/image'
import { motion } from 'framer-motion'
type formType = z.infer<typeof ListItemSchema>

type UploadThumbnailProps = {
  errors: FieldErrors<formType>
  setValue: UseFormSetValue<formType>
  resetThumbnail: number
}

const UploadThumbnail = ({ errors, setValue, resetThumbnail }: UploadThumbnailProps) => {
  const [files, setFiles] = useState<
    Array<{
      id: string
      file: File
      uploading: boolean
      progress: number
      key?: string
      isDeleting: boolean
      error: boolean
      objectUrl: string
    }>
  >([])

  useEffect(() => {
    setFiles([])
    setValue('thumbnail', '')
  }, [resetThumbnail, setValue])

  async function deleteFile(fileId: string) {
    try {
      const fileToRemove = files.find((f) => f.id === fileId)

      //Remove the file from local storage
      if (fileToRemove) {
        if (fileToRemove.objectUrl) {
          URL.revokeObjectURL(fileToRemove.objectUrl)
        }
      }
      setFiles((prevFile) =>
        prevFile.map((f) => (f.id === fileId ? { ...f, isDeleting: true } : f))
      )

      const data = {
        key: fileToRemove?.key,
      }
      const resonse = await axios.delete('/api/s3/delete', { data })
      toast.success(resonse.data?.message)
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId))
      setValue('thumbnail', '')
    } catch (error) {
      console.log(error)
      setFiles((prevFile) =>
        prevFile.map((f) => (f.id === fileId ? { ...f, isDeleting: false, error: true } : f))
      )
      toast.error('Failed to Delete File')
    }
  }
  const uploadFile = useCallback(
    async (file: File) => {
      setFiles((prevFile) => prevFile.map((f) => (f.file === file ? { ...f, uploading: true } : f)))
      try {
        const data = {
          fileName: file.name,
          contentType: file.type,
          size: file.size,
        }
        const response = await axios.post('/api/s3/upload', data)
        if (!response) {
          toast.error('Failed to get preSignedUrl')
          setFiles((prevFile) =>
            prevFile.map((f) =>
              f.file === file ? { ...f, uploading: false, progress: 0, error: true } : f
            )
          )
          return
        }
        const { preSignedUrl, uniqueKey, permanentUrl } = response.data
        await axios.put(preSignedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setFiles((prevFile) =>
                prevFile.map((f) =>
                  f.file === file ? { ...f, uploading: true, progress: percent } : f
                )
              )
            }
          },
        })
        setFiles((prevFile) =>
          prevFile.map((f) =>
            f.file === file
              ? { ...f, uploading: false, progress: 100, key: uniqueKey, error: false }
              : f
          )
        )
        setValue('thumbnail', permanentUrl)
        toast.success('Thumbnail Uploaded')
      } catch (error) {
        console.log(error)
        setFiles((prevFile) =>
          prevFile.map((f) =>
            f.file === file ? { ...f, uploading: false, error: true, progress: 0 } : f
          )
        )
        toast.error('Upload failed')
      }
    },
    [setFiles, setValue]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setFiles([
          {
            id: 'abcd',
            file: file,
            uploading: false,
            progress: 0,
            isDeleting: false,
            error: false,
            objectUrl: URL.createObjectURL(file),
          },
        ])
        acceptedFiles.forEach(uploadFile)
      }
    },
    [uploadFile]
  )

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === 'too-many-files'
      )
      const tooLargeFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === 'file-too-large'
      )
      if (tooManyFiles) {
        toast.error('Upload only one file')
      }
      if (tooLargeFiles) {
        toast.error('File size cannot be above 5mb')
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    noClick: true,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    disabled: files.length >= 1,
  })

  return (
    <div className="space-x-4 flex">
      <div className="w-[50%] space-y-4">
        {/* DropZone - Updated with motion and new styling */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card
            className={cn(
              'border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer',
              files.length >= 1 && 'opacity-50 pointer-events-none cursor-not-allowed'
            )}
            {...getRootProps()}
          >
            <CardContent className="h-full flex flex-col w-full justify-center items-center py-6">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-600">Drop the thumbnail here...</p>
              ) : (
                <div className="flex justify-center items-center flex-col gap-y-3">
                  <p className="text-gray-600">Drag &amp; drop thumbnail here</p>
                  <Button
                    type="button"
                    className="mt-2 bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      open()
                    }}
                  >
                    Click to browse
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        {errors.thumbnail && (
          <p className="text-red-500 text-sm">{errors.thumbnail.message as string}</p>
        )}
      </div>

      {/* Image Preview */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-1 gap-x-1">
        {files.map((file) => (
          <motion.div
            key={file.id}
            className="relative w-32 h-32 rounded overflow-hidden shadow-lg group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={file.objectUrl}
              alt={file.file.name}
              fill
              className="w-full h-full object-cover rounded"
            />
            {/* Overlay for progress and delete */}
            {(file.uploading || file.progress < 100 || file.isDeleting) && (
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center transition-opacity">
                {/* Progress Bar */}
                {file.uploading && (
                  <div className="w-4/5">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-white font-semibold">{file.progress}%</span>
                  </div>
                )}
                {/* Deleting Spinner */}
                {file.isDeleting && <Loader2 className="animate-spin text-white mt-2" />}
              </div>
            )}
            {/* Delete Button */}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 z-10 opacity-80 group-hover:opacity-100"
              onClick={() => deleteFile(file.id)}
              disabled={file.uploading || file.isDeleting}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              {file.isDeleting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default UploadThumbnail
