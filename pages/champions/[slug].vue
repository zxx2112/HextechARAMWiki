<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { championsBySlug, roleLabels } from '~/data/wikiData';

const route = useRoute();

const slug = computed(() => {
  const raw = route.params.slug;
  return typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : '';
});

const champion = computed(() => (slug.value ? championsBySlug[slug.value] : undefined));
</script>

<template>
  <header class="hero">
    <div class="hero__content">
      <p class="hero__eyebrow">英雄详情</p>
      <h1 v-if="champion">{{ champion.name }}</h1>
      <h1 v-else>未找到该英雄</h1>
      <p v-if="champion" class="hero__lede">{{ roleLabels[champion.role] }} · 出装与操作要点</p>
      <p v-else class="hero__lede">请从主页英雄头像进入。</p>
      <div class="hero__actions">
        <NuxtLink class="button button--ghost" to="/">返回主页</NuxtLink>
      </div>
    </div>

    <div class="hero__badge" v-if="champion">
      <div class="badge__title">头像</div>
      <div class="badge__body">
        <div class="champion-avatar champion-avatar--large">
          <img v-if="champion.avatar" :src="champion.avatar" :alt="champion.name" />
          <div v-else class="champion-avatar__fallback">{{ champion.name.slice(0, 1) }}</div>
        </div>
      </div>
    </div>
  </header>

  <main class="layout">
    <section class="panel" v-if="champion">
      <div class="panel__header">
        <h2>速查卡</h2>
        <p class="muted">默认展示完整信息（出装、微操与提醒）。</p>
      </div>

      <article class="card">
        <div class="card__title">
          {{ champion.name }} <span class="card__role">{{ roleLabels[champion.role] }}</span>
        </div>

        <div v-if="champion.build?.length" class="tag">{{ champion.build[0] }}</div>

        <ul v-if="champion.micro?.length" class="card__list">
          <li v-for="tip in champion.micro" :key="tip">{{ tip }}</li>
        </ul>

        <p v-if="champion.warning" class="muted">{{ champion.warning }}</p>
      </article>
    </section>
  </main>

  <footer class="footer">
    <p>为速排而生，欢迎在 ARAM 频道反馈。</p>
  </footer>
</template>
