/*import Image from "next/image"*/


/*export default function About() {
    return <div>
        <h1>About Page</h1>
        <Image src="/Tulip 1.jpg" width="1000" height="800" size="100vw"/>
    </div>
}*/


import ImgHight from '@/assets/Tulip 1.jpg'

export default function About() {
    return <div>
        <h1>About Page</h1>
        <img {... ImgHight}/>
    </div>
}