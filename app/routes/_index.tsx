import type { LoaderArgs } from "@remix-run/node";
import Layout from "~/layouts/MainLayout";
import { json } from "@remix-run/node";
import {} from "flowbite-react";

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function IndexPage() {
  return (
    <Layout>
      <div className="px-4 pt-6">Home</div>
    </Layout>
  );
}
