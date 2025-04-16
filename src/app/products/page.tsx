import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Products</h1>
            <p className="text-gray-600">This is the products page.</p>
            <Button className="mt-4" >
                View Products
            </Button>
            <Input className="mt-4" placeholder="Search Products" />
        </div>
    );
}

export default ProductPage;