<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="60"
    height="149"
    viewBox="0 0 60 149"
  >
    <defs>
      <filter
        id="Многоугольник_4"
        x="0"
        y="0"
        width="60"
        height="149"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy="3" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood flood-opacity="0.161" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Многоугольник_4)">
      <path
        id="Многоугольник_4-2"
        data-name="Многоугольник 4"
        d="M62.261,2.077a6,6,0,0,1,6.477,0l45.027,28.872A6,6,0,0,1,110.527,42H20.473a6,6,0,0,1-3.239-11.051Z"
        transform="translate(9 137) rotate(-90)"
        fill="#9a9a9a"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "ButtonArrow",
};
</script>
