import {
  Cuisine,
  PRICE,
  PrismaClient,
  Location,
  PrismaPromise,
} from '@prisma/client'
import RestaurantCard from './components/RestaurantCard'
import Header from './components/Header'
import SearchSidebar from './components/SearchSidebar'

const prisma = new PrismaClient()

const fetchRestaurantsByCity = (city: string | undefined) => {
  const select = {
    id: true,
    price: true,
    slug: true,
    name: true,
    main_image: true,
    location: true,
    cuisine: true,
  }
  if (!city) return prisma.restaurant.findMany({ select })
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  })
}

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string }
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams.city)
  console.log(restaurants)

  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSidebar />
        <div className='w-5/6'>
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </>
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
      </div>
    </>
  )
}
