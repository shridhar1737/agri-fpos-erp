
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: "P001",
    name: "Premium Quality Seeds",
    category: "Seeds",
    description: "High-yield vegetable seeds",
    price: 450,
    unit: "packet",
    stock: 200,
    status: "in-stock"
  },
  {
    id: "P002",
    name: "Organic Fertilizer",
    category: "Fertilizers",
    description: "Natural bio-fertilizer",
    price: 850,
    unit: "kg",
    stock: 50,
    status: "low-stock"
  },
  {
    id: "P003",
    name: "Drip Irrigation Kit",
    category: "Equipment",
    description: "Water-efficient irrigation system",
    price: 2500,
    unit: "set",
    stock: 0,
    status: "out-of-stock"
  }
];

export function ProductCatalog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Catalog</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{product.name}</h3>
                  <Badge variant={
                    product.status === "in-stock" ? "success" :
                    product.status === "low-stock" ? "warning" : "destructive"
                  }>
                    {product.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">₹{product.price}/{product.unit}</span>
                  <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {product.category}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
