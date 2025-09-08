import { Dashboard } from "./pages/Dashboard";
import { Product } from "./pages/Product";

export const routes=[
    {path:"/", element:<Dashboard/>},
    {path:"/productos", element:<Dashboard children={<Product/>}/>}
]