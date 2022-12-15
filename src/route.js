import {
    createBrowserRouter,
} from "react-router-dom";
import OutLet from "./components/OutLet"
import HomePage from "./components/HomePage";
import AddCat from "./components/AddCat";
import AddPdt from "./components/AddPdt";
import ShowCat from "./components/ShowCat";
import ShowPdt from "./components/ShowPdt";
import EditCat from "./components/EditCat";
import DeleteCat from "./components/DeleteCat";
import DeletePdt from "./components/DeletePdt";
import EditPro from "./components/EditPro";
const router = createBrowserRouter([
    {
        path: "/",
        element: <OutLet />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/add-category",
                element: <AddCat />
            },
            {
                path: "/add-product",
                element: <AddPdt />
            },
            {
                path: "/show-category",
                element: <ShowCat />
            },

            {
                path: "/show-product",
                element: <ShowPdt />
            },
            {
                path: "/delete-cat/:id",
                element: <DeleteCat />
            },
            {
                path: "/delete-pdt/:id",
                element: <DeletePdt />
            },
            {
                path: '/edit-cat/:id',
                element: <EditCat />
            },
            {
                path: '/edit-pdt/:id',
                element: <EditPro />
            },
        ]
    }

]);

export default router;