import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { PageNotFound } from "./NotFound";
import { PageHome } from "./Home";
import { PageUser } from "./User";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/Git-Finder/" element={<PageHome />} />
      <Route path="/Git-Finder/user" element={<PageUser />}>
        <Route path=":profile" element={<PageUser />} />
      </Route>
      <Route path="/Git-Finder/*" element={<PageNotFound />} />
    </Route>
  )
);
