import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Publications } from "./collections/Publications";
import { Events } from "./collections/Events";
import { Programs } from "./collections/Programs";
import { YplFellows } from "./collections/YplFellows";
import { RoundtableSeries } from "./collections/RoundtableSeries";
import { TeamMembers } from "./collections/TeamMembers";
import { ContactSubmissions } from "./collections/ContactSubmissions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " - NAPI CMS",
      description: "Content management dashboard for the North Africa Policy Institute website.",
      icons: [{ url: "/media/logo_napi.png", type: "image/png" }],
    },
    components: {
      graphics: {
        Logo: "/components/payload/Logo#Logo",
        Icon: "/components/payload/Logo#Icon",
      },
      providers: ["/components/payload/ThemeProvider#ThemeProvider"],
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Publications, Events, Programs, YplFellows, RoundtableSeries, TeamMembers, ContactSubmissions],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  // Powers automatic image resizing/thumbnails for the Media collection
  // (see collections/Media.ts imageSizes) so editors get fast-loading
  // previews in /admin and on the site instead of full-size originals.
  sharp,
});
