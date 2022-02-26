import { createSVGResource } from './svgFactory'

export const Done = createSVGResource(
  <path d="M0 0h24v24H0V0z" fill="none" />,
  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
)

export const Notification = createSVGResource(
  <path d="M0 0h24v24H0V0z" fill="none" />,
  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
)

export const Warning = createSVGResource(
  <path d="M0 0h24v24H0z" fill="none" />,
  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
)

export const Settings = createSVGResource(
  <path d="M0,0h24v24H0V0z" fill="none" />,
  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
)

export const Calendar = createSVGResource(
  <path d="M0 0h24v24H0z" fill="none" />,
  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
)

export const LightBulb = createSVGResource(
  <path d="M0 0h24v24H0z" fill="none" />,
  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
)

export const ForwardRTL = createSVGResource(
  <path d="M0 0h24v24H0z" fill="none" />,
  <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
)

export const BackRTL = createSVGResource(
  <g>
    <path d="M0,0h24v24H0V0z" fill="none" />
  </g>,
  <g>
    <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
  </g>
)

export const Delete = createSVGResource(
  <path d="M0 0h24v24H0V0z" fill="none" />,
  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
)

export const Close = createSVGResource(
  <path d="M0 0h24v24H0V0z" fill="none" />,
  <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
)

export const Expand = createSVGResource(
  <path d="M0 0h24v24H0z" fill="none" />,
  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
)

export const Shahaf = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 110 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_155_451)">
        <path
          d="M108.716 54C109.239 51.274 109.5 48.4442 109.5 45.5625C109.5 20.4058 88.9546 0 63.6258 0C38.297 0 17.7517 20.4058 17.7517 45.5625C17.7517 48.4442 18.0131 51.274 18.5359 54"
          fill="url(#paint0_radial_155_451)"
        />
        <path
          d="M32.7817 18.5885C32.7817 18.5885 51.994 13.7596 59.3129 19.2115C59.3129 19.2115 65.8477 13.2404 82.5767 12.9808C82.5767 12.9808 65.3249 10.6442 59.3129 15.0577C59.3129 15.0577 37.3561 11.501 32.7817 18.5885Z"
          fill="#16455C"
        />
        <path
          d="M0.5 41.2789C0.5 41.2789 22.1954 32.4519 34.4808 40.7596C34.4808 40.7596 50.9484 25.4423 65.0635 26.7404C65.0635 26.7404 44.0648 20.5097 32.5 33.5001C32.5 33.5001 12.524 29.3365 0.5 41.2789Z"
          fill="#16455C"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_155_451"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(63.4951 35.0481) rotate(90) scale(39.3317 39.6007)"
        >
          <stop stop-color="#FFD200" />
          <stop offset="1" stop-color="#FF892D" />
        </radialGradient>
        <clipPath id="clip0_155_451">
          <rect
            width="109"
            height="54"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
