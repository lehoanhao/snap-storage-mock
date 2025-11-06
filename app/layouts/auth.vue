<template>
  <div class="h-screen flex items-center justify-center overlay">
    <div class="gradient" />
    <div class="flex flex-col items-center gap-0">
      <BaseLogo class="!text-3xl" size="3xl" />
      <UPageCard variant="subtle" class="min-w-sm w-full max-w-md mt-6">
        <slot />
      </UPageCard>
    </div>
  </div>
</template>

<style>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(var(--color-primary-500) / 0.25) 0,
    #fff 100%
  );
}

.dark {
  .gradient {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgb(var(--color-primary-400) / 0.1) 0,
      rgb(var(--color-gray-950)) 100%
    );
  }
}

.overlay {
  background-size: 100px 100px;
  background-image: linear-gradient(
      to right,
      rgb(var(--color-gray-200)) 0.5px,
      transparent 0.5px
    ),
    linear-gradient(
      to bottom,
      rgb(var(--color-gray-200)) 0.5px,
      transparent 0.5px
    );
}
.dark {
  .overlay {
    background-image: linear-gradient(
        to right,
        rgb(var(--color-gray-900)) 0.5px,
        transparent 0.5px
      ),
      linear-gradient(
        to bottom,
        rgb(var(--color-gray-900)) 0.5px,
        transparent 0.5px
      );
  }
}
</style>
