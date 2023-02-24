import { PrismaClient } from '@prisma/client'
import Menu from '../components/Menu'
import RestaurantNavbar from '../components/RestaurantNavbar'

const prisma = new PrismaClient()

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  })
  if (!restaurant) {
    throw new Error('Restaurant not found')
  }
  return restaurant.items
}

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string }
}) {
  const menu = await fetchRestaurantMenu(params.slug)
  return (
    <>
      <div className='bg-white w-[100%] rounded p-3 shadow'>
        <RestaurantNavbar slug={params.slug} />
        {menu.length > 0 ? (
          <Menu menu={menu} />
        ) : (
          <p className='text-center'>No menu items found</p>
        )}
      </div>
    </>
  )
}
