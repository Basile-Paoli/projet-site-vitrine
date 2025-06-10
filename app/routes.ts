import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/Layout.tsx", [
    index("routes/home.tsx"),
    route("sessions/:id", "routes/session.tsx"),
  ]),
] satisfies RouteConfig;
