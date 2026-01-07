<script setup lang="ts">
import { computed, ref } from 'vue';
import { champions, roleLabels } from '~/data/wikiData';

const search = ref('');
const role = ref<'all' | keyof typeof roleLabels>('all');

const normalizedSearch = computed(() => search.value.trim().toLowerCase());

const filteredChampions = computed(() =>
  champions.filter((champ) => {
    const matchesRole = role.value === 'all' || champ.role === role.value;
    const matchesSearch = champ.name.toLowerCase().includes(normalizedSearch.value);
    return matchesRole && matchesSearch;
  })
);

</script>

<template>
  <header class="hero">
    <div class="hero__content">
      <p class="hero__eyebrow">嚎哭深渊资料库</p>
      <h1>Hextech ARAM Wiki</h1>
      <p class="hero__lede">针对极地大乱斗的出装、节奏与团队配合速查笔记，排队间隙快速浏览。</p>
      <div class="hero__actions">
        <a class="button" href="#champions">查看英雄头像</a>
      </div>
    </div>
    <div class="hero__badge">
      <div class="badge__title">已适配版本</div>
      <div class="badge__body">覆盖当前 ARAM 改动：塔防饰品、后排小兵与死亡计时。</div>
    </div>
  </header>

  <main class="layout">
    <section class="panel" id="champions">
      <div class="panel__header panel__header--split">
        <div>
          <h2>英雄速查卡</h2>
          <p>主页默认只显示头像，点击进入详情页查看出装与操作要点。</p>
        </div>
        <div class="controls">
          <label class="field">
            <span class="field__label">搜索</span>
            <input v-model="search" type="search" placeholder="例如：拉克丝、伊泽瑞尔" />
          </label>
          <label class="field">
            <span class="field__label">定位</span>
            <select v-model="role">
              <option value="all">全部</option>
              <option value="poke">消耗</option>
              <option value="frontline">前排</option>
              <option value="assassin">刺客</option>
              <option value="enchanter">增益</option>
              <option value="mage">战斗法师</option>
            </select>
          </label>
        </div>
      </div>

      <div class="grid grid--avatars" id="champion-grid">
        <p v-if="!filteredChampions.length" class="muted">没有匹配的英雄，请尝试其他名称或类型。</p>

        <NuxtLink
          v-for="champ in filteredChampions"
          :key="champ.slug"
          class="card card--avatar"
          :to="`/champions/${champ.slug}`"
          :aria-label="`查看 ${champ.name} 详情`"
          :title="`${champ.name} · ${roleLabels[champ.role]}`"
        >
          <div class="champion-avatar">
            <img v-if="champ.avatar" :src="champ.avatar" :alt="champ.name" loading="lazy" />
            <div v-else class="champion-avatar__fallback">{{ champ.name.slice(0, 1) }}</div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>为速排而生，欢迎在 ARAM 频道反馈。</p>
  </footer>
</template>
