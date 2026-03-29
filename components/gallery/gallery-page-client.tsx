'use client'

import * as React from 'react'
import GalleryHeader from '@/components/gallery/GalleryHeader'
import CategoryHoverCard, { EventPreview } from '@/components/gallery/CategoryHoverCard'
import GalleryGrid, { GalleryItem } from '@/components/gallery/GalleryGrid'
import EventGroup from '@/components/gallery/EventGroup'
import TimelineView from '@/components/gallery/TimelineView'
import ImageModal from '@/components/gallery/ImageModal'
import type { GalleryItemsQueryResult } from '@/sanity.types'

const galleryConfig = {
  title: 'GALLERY',
  description: 'Showcasing our events and activities',
}

function getAllCategories(galleryItems: GalleryItemsQueryResult) {
  if (!galleryItems) return []
  const cats = new Set(galleryItems.map((item) => item.category).filter(Boolean) as string[])
  return Array.from(cats).sort()
}

// Get event previews for a category
function getEventPreviewsForCategory(
  galleryItems: GalleryItemsQueryResult, 
  category: string
): EventPreview[] {
  const categoryItems = galleryItems.filter(item => item.category === category)
  const eventMap = new Map<string, { displayName: string; items: typeof categoryItems; latestDate: Date }>()

  categoryItems.forEach(item => {
    // Use title as the display name (matches what users see in Sanity Studio)
    const title = (item.title || 'Untitled Event') as string
    const normalizedTitle = title.trim().toLowerCase()
    const date = item.date ? new Date(item.date) : new Date()
    
    if (!eventMap.has(normalizedTitle)) {
      eventMap.set(normalizedTitle, { displayName: title.trim(), items: [], latestDate: date })
    }
    
    const eventData = eventMap.get(normalizedTitle)!
    eventData.items.push(item)
    if (date > eventData.latestDate) {
      eventData.latestDate = date
    }
  })

  return Array.from(eventMap.values())
    .sort((a, b) => b.latestDate.getTime() - a.latestDate.getTime())
    .map((data) => ({
      eventName: data.displayName,
      imageCount: data.items.length,
      latestImage: data.items[0]?.imageUrl,
      date: data.latestDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }))
}

// Convert Sanity data to GalleryItem format
function convertSanityToGalleryItem(sanityItem: GalleryItemsQueryResult[0]): GalleryItem | null {
  if (!sanityItem.imageUrl || !sanityItem.title || !sanityItem.category) {
    return null
  }
  
  // Use title as fallback if eventName is missing (for backward compatibility)
  const eventName = sanityItem.eventName || sanityItem.title || 'Untitled Event'
  
  return {
    id: sanityItem._id,
    src: sanityItem.imageUrl,
    alt: sanityItem.title,
    category: sanityItem.category,
    title: sanityItem.title,
    eventName: eventName,
    date: sanityItem.date ? new Date(sanityItem.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    description: sanityItem.description || undefined
  }
}

// Group items by event name
function groupByEvent(items: GalleryItem[]): { [eventName: string]: GalleryItem[] } {
  const grouped: { [eventName: string]: GalleryItem[] } = {}

  
  items.forEach(item => {
    // Normalize the title: trim whitespace and convert to lowercase for grouping
    const normalizedTitle = item.title.trim().toLowerCase()
    
    // Find existing group with same normalized name
    let groupKey = Object.keys(grouped).find(
      key => key.trim().toLowerCase() === normalizedTitle
    )
    
    // If no group exists, use the current item's title as the key
    if (!groupKey) {
      groupKey = item.title.trim()
      grouped[groupKey] = []
    }
    
    grouped[groupKey].push(item)
  })

  return grouped
}

// Group items by month for timeline view
function groupByMonthTimeline(items: GalleryItem[]) {
  const monthGroups = new Map<string, { month: string; year: string; events: { [eventName: string]: { category: string; items: GalleryItem[] } } }>()

  items.forEach(item => {
    const date = new Date(item.date)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthName = date.toLocaleDateString('en-US', { month: 'long' })
    const year = date.getFullYear().toString()

    if (!monthGroups.has(monthYear)) {
      monthGroups.set(monthYear, { month: monthName, year, events: {} })
    }

    const monthData = monthGroups.get(monthYear)!
    const normalizedTitle = item.title.trim().toLowerCase()
    
    // Find existing event with same normalized title
    let eventKey = Object.keys(monthData.events).find(
      key => key.trim().toLowerCase() === normalizedTitle
    )
    
    // If no event exists, use the current item's title as the key
    if (!eventKey) {
      eventKey = item.title.trim()
      monthData.events[eventKey] = { category: item.category, items: [] }
    }

    monthData.events[eventKey].items.push(item)
  })

  return Array.from(monthGroups.values()).sort((a, b) => {
    const dateA = new Date(`${a.month} ${a.year}`)
    const dateB = new Date(`${b.month} ${b.year}`)
    return dateB.getTime() - dateA.getTime()
  })
}

interface GalleryPageClientProps {
  galleryItems: GalleryItemsQueryResult
}

export function GalleryPageClient({ galleryItems }: GalleryPageClientProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("View All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedImage, setSelectedImage] = React.useState<GalleryItem | null>(null)

  // Convert Sanity data to GalleryItem format
  const convertedItems = React.useMemo(() => {
    return galleryItems
      .map(convertSanityToGalleryItem)
      .filter((item): item is GalleryItem => item !== null)
  }, [galleryItems])

  const availableCategories = React.useMemo(() => {
    const cats = getAllCategories(galleryItems)
    return ["View All", ...cats]
  }, [galleryItems])

  // Get event previews for each category for hover cards
  const categoryEventPreviews = React.useMemo(() => {
    const previews: { [category: string]: EventPreview[] } = {}
    availableCategories.forEach(category => {
      if (category !== "View All") {
        previews[category] = getEventPreviewsForCategory(galleryItems, category)
      }
    })
    return previews
  }, [galleryItems, availableCategories])

  const filteredItems = React.useMemo(() => {
    let items = [...convertedItems]
    
    if (selectedCategory !== "View All") {
      items = items.filter(item => item.category === selectedCategory)
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        item.eventName.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      )
    }
    return items
  }, [convertedItems, selectedCategory, searchQuery])

  // Group items for display
  const groupedByEvent = React.useMemo(() => groupByEvent(filteredItems), [filteredItems])
  const timelineGroups = React.useMemo(() => groupByMonthTimeline(filteredItems), [filteredItems])

  const openModal = React.useCallback((image: GalleryItem) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = React.useCallback(() => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }, [])

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage) return
    const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedImage(filteredItems[prevIndex])
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage) return
    const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setSelectedImage(filteredItems[nextIndex])
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeModal()
        if (e.key === 'ArrowLeft') {
          const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id)
          if (currentIndex === -1) return
          const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
          setSelectedImage(filteredItems[prevIndex])
        }
        if (e.key === 'ArrowRight') {
          const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id)
          if (currentIndex === -1) return
          const nextIndex = (currentIndex + 1) % filteredItems.length
          setSelectedImage(filteredItems[nextIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, filteredItems, closeModal])

  return (
    <div className="w-full">
      <GalleryHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Category Filter with Hover Cards */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {availableCategories.map(category => (
          <CategoryHoverCard
            key={category}
            category={category}
            events={categoryEventPreviews[category] || []}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>
      
      {/* Display Logic */}
      {selectedCategory === "View All" ? (
        // Timeline View
        <TimelineView monthGroups={timelineGroups} onItemClick={openModal} />
      ) : (
        // Event-Grouped View for specific category
        <div className="max-w-7xl mx-auto px-4">
          {Object.entries(groupedByEvent)
            .sort(([, a], [, b]) => {
              const dateA = new Date(a[0]?.date || 0)
              const dateB = new Date(b[0]?.date || 0)
              return dateB.getTime() - dateA.getTime()
            })
            .map(([eventName, items]) => (
              <EventGroup
                key={eventName}
                eventName={eventName}
                items={items}
                onItemClick={openModal}
              />
            ))}
        </div>
      )}
      
      <ImageModal
        selectedImage={selectedImage}
        onClose={closeModal}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </div>
  )
}
