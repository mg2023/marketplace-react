import Grid from "../../components/Grid/Grid";
import Slider from "../../components/Slider/Slider";
import { imageUrls, imageAds, products, destacados, nuevosProductos } from "../../data/Data"

export default function Home() {
    
    return (
        <>
            <Slider urls={imageUrls} />
            <Grid products={products} />
            <h3 className="text-center text-4xl uppercase">Destacados</h3>
            <Grid products={destacados} />
            <Slider urls={imageAds} />
            <h3 className="text-center text-4xl uppercase mt-16">Nuevos Productos</h3>
            <Grid products={nuevosProductos} />
        </>
    )
}
