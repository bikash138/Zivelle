'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  Search,
  ShoppingBag,
  CreditCard,
  RotateCcw,
  Shield,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Package,
  User,
  Settings,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const categories = [
    {
      icon: ShoppingBag,
      title: 'Orders & Shipping',
      description: 'Track orders, shipping info, and delivery',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      icon: CreditCard,
      title: 'Payments & Refunds',
      description: 'Payment methods, refunds, and billing',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: RotateCcw,
      title: 'Returns & Exchanges',
      description: 'Return policies and exchange process',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: Shield,
      title: 'Account & Security',
      description: 'Manage account settings and security',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
  ]

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: 'How can I track my order?',
          a: 'You can track your order by logging into your account and visiting the "Orders" section. You\'ll receive tracking information via email once your order ships.',
        },
        {
          q: 'What are the shipping options available?',
          a: 'We offer standard shipping (5-7 business days), express shipping (2-3 business days), and same-day delivery in select areas. Free shipping is available on orders over ₹999.',
        },
        {
          q: 'How long does delivery take?',
          a: 'Delivery times vary by location and shipping method. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days.',
        },
      ],
    },
    {
      category: 'Payments & Refunds',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.',
        },
        {
          q: 'How long does a refund take?',
          a: 'Refunds are processed within 5-7 business days after we receive your returned item. The amount will be credited to your original payment method.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, we use industry-standard encryption to protect your payment information. We never store your complete card details on our servers.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'You can return items within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.',
        },
        {
          q: 'How do I initiate a return?',
          a: 'Log into your account, go to "Orders", select the item you want to return, and click "Return Item". Follow the instructions to generate a return label.',
        },
        {
          q: 'Are return shipping costs covered?',
          a: 'Yes, we provide free return shipping for all returns. Simply use the prepaid return label provided in your return confirmation email.',
        },
      ],
    },
    {
      category: 'Account & Security',
      questions: [
        {
          q: 'How do I change my password?',
          a: 'Go to your account settings, click on "Security", and select "Change Password". Enter your current password and your new password.',
        },
        {
          q: 'How do I update my profile information?',
          a: 'Navigate to your profile page and click "Edit Profile". You can update your name, email, phone number, and address information.',
        },
        {
          q: 'How do I delete my account?',
          a: 'Contact our support team to request account deletion. Please note that this action is permanent and cannot be undone.',
        },
      ],
    },
  ]

  const allFaqs = faqs.flatMap((category) =>
    category.questions.map((faq) => ({
      ...faq,
      category: category.category,
    }))
  )

  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 mb-6"
          >
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500 rounded-xl bg-white dark:bg-gray-800"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="cursor-pointer"
            >
              <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors duration-300">
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors duration-300">
                    <CardHeader className="cursor-pointer" onClick={() => toggleFaq(index)}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-0">
                              {faq.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg text-gray-900 dark:text-white pr-8">
                            {faq.q}
                          </CardTitle>
                        </div>
                        <motion.div
                          animate={{ rotate: openFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {openFaq === index ? (
                            <ChevronUp className="w-5 h-5 text-orange-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </motion.div>
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="pt-0">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.a}
                            </p>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No results found. Try a different search term.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Still need help?</h2>
            <p className="text-orange-100 text-center mb-8 text-lg">
              Our support team is here to assist you 24/7
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20"
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-orange-100 mb-4">Chat with us now</p>
                <Button
                  variant="outline"
                  className="bg-white text-orange-600 hover:bg-orange-50 border-0"
                >
                  Start Chat
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20"
              >
                <Mail className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-orange-100 mb-4">support@zivelle.com</p>
                <Button
                  variant="outline"
                  className="bg-white text-orange-600 hover:bg-orange-50 border-0"
                >
                  Send Email
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20"
              >
                <Phone className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-orange-100 mb-4">+91 1800-123-4567</p>
                <Button
                  variant="outline"
                  className="bg-white text-orange-600 hover:bg-orange-50 border-0"
                >
                  Call Now
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Package, label: 'Track Order', href: '/user/orders' },
            { icon: User, label: 'My Account', href: '/user/profile' },
            { icon: Settings, label: 'Settings', href: '/user/profile' },
            { icon: ShoppingBag, label: 'Shop Now', href: '/catalog' },
          ].map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors duration-300"
            >
              <link.icon className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {link.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default HelpPage
