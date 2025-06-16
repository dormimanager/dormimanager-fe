<template>
  <header class="header-container">
    <div class="header-left">
      <img src="@/assets/logo.png" alt="로고" class="logo" />
      <span class="system-title">기숙사 생활 관리 시스템</span>
    </div>
    <div class="header-right">
      <button class="menu-btn" aria-label="메뉴">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderPage'
}
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  /* padding: 18px 32px 18px 24px; */
  box-shadow: 0 2px 8px #eee;
  border-radius: 6px 6px 0 0;
  
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

.system-title {
  font-size: 1.7rem;
  font-weight: 500;
  color: #222;
  letter-spacing: 0.03em;
}

.header-right {
  display: flex;
  align-items: center;
}

.menu-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 32px;
  width: 38px;
}

.bar {
  display: block;
  width: 30px;
  height: 4px;
  margin: 3px 0;
  background: #6ed0f7;
  border-radius: 2px;
  transition: 0.3s;
}
</style>
