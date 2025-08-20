/*import Image from "next/image"*/


/*export default function About() {
    return <div>
        <h1>About Page</h1>
        <Image src="/Tulip 1.jpg" width="1000" height="800" size="100vw"/>
    </div>
}*/


//import ImgHight from '@/assets/Tulip 1.jpg'
//import HeavyComponent from "@/components/HeavyComponent"
import dynamic from "next/dynamic"
import { useState } from "react" 

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), { ssr: false, loading: () => <p>Loading...</p>})

export default function About() {
    const [show, setShow] = useState(false)
    return <div>
        <h1>About Page</h1>
        <button onClick={() => setShow(true)}>Show Component</button>
        {/*<img {... ImgHight}/>*/}
        { show && <HeavyComponent /> }
    </div>
}