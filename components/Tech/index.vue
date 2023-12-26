<template>
  <div v-if="view === 'inline' " class="tech--inline">
    <div class="tech-item" v-if="tech.complectation">
      <div>Комплектация</div>
      <div>
        {{ tech.complectation }}
      </div>
    </div>
    <div class="tech-item" v-if="tech.body_type">
      <div>Тип кузова</div>
      <div>
        {{ tech.body_type }}
      </div>
    </div>
    <div class="tech-item" v-if="tech.engine_type">
      <div>Тип двигателя</div>
      <div>
        {{ tech.engine_type }}
      </div>
    </div>
    <div class="tech-item" v-if="tech.fuel">
      <div>Расход топлива</div>
      <div>
        {{ tech.fuel }} л.
      </div>
    </div>
    <div class="tech-item" v-if="tech.time">
      <div>Разгон до 100 км/ч</div>
      <div>
        {{ tech.time }} с.
      </div>
    </div>
    <div class="tech-item" v-if="tech.engine_volume">
      <div>Объем двигателя</div>
      <div>
        {{ tech.engine_volume }} л.
      </div>
    </div>
    <div class="tech-item" v-if="tech.engine_power">
      <div>Мощность двигателя</div>
      <div>
        {{ tech.engine_power }} л.с.
      </div>
    </div>
    <div class="tech-item" v-if="tech.gearbox">
      <div>КПП</div>
      <div>
        {{ tech.gearbox }}
      </div>
    </div>
    <div class="tech-item" v-if="tech.drive_type">
      <div>Привод</div>
      <div>
        {{ tech.drive_type }}
      </div>
    </div>
    <div class="tech-item" v-if="tech.max_speed">
      <div>Макс. скорость</div>
      <div>
        {{ tech.max_speed }} км/ч
      </div>
    </div>
  </div>
  <div v-else class="tech">
    <div class="tech-item" v-if="tech.engine_volume">
      <nuxt-icon name="fuel"/>
      <div>
        {{ tech.engine_volume }} л.
      </div>
    </div>
    <div class="tech-item" v-if="tech.time">
      <nuxt-icon name="timer"/>
      <div>
        {{ tech.time }} с.
      </div>
    </div>
    <div class="tech-item" v-if="tech.engine_power">
      <nuxt-icon name="pace"/>
      <div>
        {{ tech.engine_power }} л.с.
      </div>
    </div>
    <div class="tech-item" v-if="tech.max_speed">
      <nuxt-icon name="engine"/>
      <div>
        {{ tech.max_speed }} км/ч
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

export type TechType = {
  complectation?: any
  body_type?: any
  engine_type?: any,
  gearbox?: any,
  drive_type?: any,
  engine_volume?: any
  fuel?: any
  engine_power?: any
  time?: any
  max_speed?: any
}

const props = defineProps<{
  tech: TechType;
  view?: string
}>();
</script>
