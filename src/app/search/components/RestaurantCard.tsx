import Link from 'next/link'
import { Cuisine, PRICE, Location, Review } from '@prisma/client'
import Price from '@/app/components/Price'
import { calculateReviewRatingAverage } from 'utils/calculateReviewRatingAverage'
import Stars from '@/app/components/Stars'

interface Restaurant {
  id: number
  price: PRICE
  slug: string
  name: string
  main_image: string
  location: Location
  cuisine: Cuisine
  reviews: Review[]
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant
}) {
  const renderRating = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews)
    if (rating > 4) {
      return 'Awesome'
    } else if (rating > 3 && rating <= 4) {
      return 'Good'
    } else if (rating > 0 && rating <= 3) {
      return 'Average'
    } else ''
  }
  return (
    <div className='border-b flex pb-5'>
      <img
        src={restaurant.main_image}
        alt={restaurant.name}
        className='w-44 h-36 rounded'
      />
      <div className='pl-5'>
        <h2 className='text-3xl'>{restaurant.name}</h2>
        <div className='flex items-start'>
          <div className='flex mb-2'>
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className='ml-2 text-sm'>{renderRating()}</p>
        </div>
        <div className='mb-9'>
          <div className='font-light flex text-reg'>
            <Price price={restaurant.price} />
            <p className='mr-4 capitalize'>{restaurant.cuisine.name}</p>
            <p className='mr-4 capitalize'>{restaurant.location.name}</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  )
}
