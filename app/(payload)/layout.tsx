import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import "@payloadcms/next/css";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

// This is Payload's OWN root layout — deliberately separate from the site's
// `app/(frontend)/layout.tsx`. It renders its own <html>/<body> and must NOT
// import the site's globals.css, Navbar, or Footer, since /admin needs to be
// a self-contained dashboard, not styled by the public site's theme.
export default async function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
