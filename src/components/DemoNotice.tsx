import { site } from "../data/siteData";
export function DemoNotice() {
  return (
    <div className="demo-notice">
      <span className="demo-dot" aria-hidden="true" />
      <span>{site.notice}</span>
      <span className="notice-extra">{site.noticeDetail}</span>
    </div>
  );
}
