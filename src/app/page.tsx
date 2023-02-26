import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { PrismaClient, Cuisine, Location, PRICE, Review } from '@prisma/client'

export interface RestaurantCardType {
  name: string
  description: string
  main_image: string
  cuisine: Cuisine
  location: Location
  slug: string
  price: PRICE
  reviews: Review[]
}

const prisma = new PrismaClient()

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      name: true,
      description: true,
      main_image: true,
      cuisine: true,
      location: true,
      slug: true,
      price: true,
      reviews: true,
    },
  })
  return restaurants
}

export default async function Home() {
  const restaurants = await fetchRestaurants()
  return (
    <main>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.slug} />
        ))}
      </div>
    </main>
  )
}
