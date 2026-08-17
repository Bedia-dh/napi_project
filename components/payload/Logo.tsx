// Custom branding for the Payload admin dashboard — shown on the login
// screen and the top of the nav sidebar. Reuses the same NAPI logo file
// already used on the public site (public/media/logo_napi.png), so the
// CMS visually matches the site instead of showing Payload's default
// placeholder logo.
export function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/logo_napi.png"
      alt="NAPI"
      style={{ height: 40, width: "auto", objectFit: "contain" }}
    />
  );
}

export function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/logo_napi.png"
      alt="NAPI"
      style={{ height: 24, width: "auto", objectFit: "contain" }}
    />
  );
}
