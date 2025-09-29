export function PrivacyPolicy() {
  return (
    <div className="text-center text-xs text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <a
        href="/terms"
        className="underline underline-offset-4 hover:text-primary transition-colors"
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href="/privacy-policy"
        className="underline underline-offset-4 hover:text-primary transition-colors"
      >
        Privacy Policy
      </a>
      .
    </div>
  );
}
