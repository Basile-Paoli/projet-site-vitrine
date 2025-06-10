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
    route("reservation", "routes/reservation.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;
