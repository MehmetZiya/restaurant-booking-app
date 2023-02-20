import Header from '../components/Header'
import Menu from '../components/Menu'
import RestaurantNavbar from '../components/RestaurantNavbar'
import RestaurantLayout from '../layout'

export default function RestaurantMenu() {
  return (
    <RestaurantLayout>
      <div className='bg-white w-[100%] rounded p-3 shadow'>
        <RestaurantNavbar />
        <Menu />
      </div>
    </RestaurantLayout>
  )
}
