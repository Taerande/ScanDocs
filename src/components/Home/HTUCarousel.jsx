import styles from './HTUCarousel.module.css'
import Carousel from '../ui/Carousel'

const HTUCarousel = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src="https://images.unsplash.com/photo-1596480117349-c69fa4ac0366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1563445986604-f0956b8e2cb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1652615045919-6f745f51e7c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
                </div>
            </Carousel>
        </div>
    )

}
export default HTUCarousel