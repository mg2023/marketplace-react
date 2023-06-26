import PropTypes from "prop-types";

export default function SubMenu({ onComponentChange }) {
  return (
    <div className="w-full">
      <ul className="menu menu-horizontal flex w-full justify-center bg-secondary px-3">
        <li>
          <a
            className="text-text hover:text-text"
            onClick={() => onComponentChange("products")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-appgallery"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
              <path d="M9 8a3 3 0 0 0 6 0" />
            </svg>
            <p>Productos</p>
          </a>
        </li>
        <li>
          <a
            className="text-text hover:text-text"
            onClick={() => onComponentChange("chat")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-heart-handshake"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" />
              <path d="M12.5 15.5l2 2" />
              <path d="M15 13l2 2" />
            </svg>
            <p>Support</p>
          </a>
        </li>
        <li>
          <a
            className="text-text hover:text-text"
            onClick={() => onComponentChange("analytics")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-google-analytics"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path d="M10 9m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v9.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z" />
              <path d="M17 3m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v15.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z" />
              <path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            </svg>
            <p>Analitycs</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

SubMenu.propTypes = {
  onComponentChange: PropTypes.func.isRequired,
};
