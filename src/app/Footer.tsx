export default function Footer() {
  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        <div>
          <span className="footer-title">Services</span>
          <a className="link-hover link" href="">Branding</a>
          <a className="link-hover link" href="">Design</a>
          <a className="link-hover link" href="">Marketing</a>
          <a className="link-hover link" href="">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link-hover link" href="">About Us</a>
          <a className="link-hover link" href="">Contact</a>
          <a className="link-hover link" href="">Jobs</a>
          <a className="link-hover link" href="">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link-hover link" href="">Terms of use</a>
          <a className="link-hover link" href="">Privacy policy</a>
          <a className="link-hover link" href="">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
}
