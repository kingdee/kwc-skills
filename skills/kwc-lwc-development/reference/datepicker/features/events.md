# 事件处理

[返回目录](../SKILL.md)

## 功能说明

`sl-datepicker` 提供 `sl-change`、`sl-input` 和 `sl-invalid` 三个核心事件，分别用于监听值确认变更、输入过程中的值变化和校验失败。

## API 事件

| 事件 | 说明 | 触发时机 |
|------|------|----------|
| `sl-change` | 值确认变更 | 选择日期并确认、输入框失焦提交、清除值时触发 |
| `sl-input` | 输入过程变化 | 输入框键入、日历面板选择日期时触发（值变化的实时通知） |
| `sl-invalid` | 校验失败 | 表单校验失败时触发 |

### 事件获取值的方式

```js
// 通过 event.target.value 获取当前值
handleChange(event) {
    const value = event.target.value;  // 如 '2024-01-15' 或 '2024-01-15 14:30:00'
}
```

### sl-change 与 sl-input 的区别

| 特性 | `sl-change` | `sl-input` |
|------|-------------|------------|
| 触发频率 | 仅在值最终确认时 | 值每次变化都触发 |
| date 模式 | 选择日期后 | 选择日期时、输入时 |
| datetime 模式 | 点击确定后 | 选择日期/时间时、输入时 |
| 清除操作 | 触发 | 触发 |
| 用途 | 保存数据、提交表单 | 实时预览、联动更新 |

---

## 代码示例

### 示例1：基础事件监听

监听 `sl-change` 事件获取用户最终选择的日期。

**index.html**
```html
<template>
    <sl-datepicker
        label="选择日期"
        placeholder="请选择日期"
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="event-log" lwc:if={lastChangeValue}>
        sl-change 触发，值: {lastChangeValue}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class BasicEventDatepicker extends LightningElement {
    @track lastChangeValue = '';

    handleChange(event) {
        this.lastChangeValue = event.target.value || '（已清空）';
    }
}
```

**index.css**
```css
.event-log {
    margin-top: 12px;
    padding: 12px;
    background: #e6f7ff;
    border-radius: 4px;
    font-size: 14px;
    font-family: monospace;
}
```

---

### 示例2：区分 sl-change 和 sl-input

对比两个事件的触发时机和频率。

**index.html**
```html
<template>
    <sl-datepicker
        label="输入或选择日期"
        placeholder="请操作查看事件触发"
        onsl-change={handleChange}
        onsl-input={handleInput}
    ></sl-datepicker>
    <div class="event-panel">
        <div class="event-section">
            <h4>sl-input 事件（实时触发）</h4>
            <div class="count">触发次数: {inputCount}</div>
            <div class="value">最新值: {lastInputValue}</div>
        </div>
        <div class="event-section">
            <h4>sl-change 事件（确认时触发）</h4>
            <div class="count">触发次数: {changeCount}</div>
            <div class="value">最新值: {lastChangeValue}</div>
        </div>
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class EventComparisonDatepicker extends LightningElement {
    @track inputCount = 0;
    @track changeCount = 0;
    @track lastInputValue = '（无）';
    @track lastChangeValue = '（无）';

    handleInput(event) {
        this.inputCount++;
        this.lastInputValue = event.target.value || '（空）';
    }

    handleChange(event) {
        this.changeCount++;
        this.lastChangeValue = event.target.value || '（空）';
    }
}
```

**index.css**
```css
.event-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
}
.event-section {
    padding: 16px;
    background: #fafafa;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
}
.event-section h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
}
.count {
    font-size: 24px;
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 8px;
}
.value {
    font-size: 13px;
    color: #666;
    font-family: monospace;
}
```

---

### 示例3：实时预览与确认保存

利用 `sl-input` 做实时预览，`sl-change` 做最终保存。

**index.html**
```html
<template>
    <sl-datepicker
        label="选择日期"
        type="datetime"
        placeholder="实时预览 + 确认保存"
        onsl-input={handleInput}
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="panels">
        <div class="panel preview">
            <h4>实时预览（sl-input）</h4>
            <div class="display">{previewValue}</div>
        </div>
        <div class="panel saved">
            <h4>已保存（sl-change）</h4>
            <div class="display">{savedValue}</div>
        </div>
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class PreviewSaveDatepicker extends LightningElement {
    @track previewValue = '等待输入...';
    @track savedValue = '等待确认...';

    handleInput(event) {
        const value = event.target.value;
        this.previewValue = value || '（空）';
    }

    handleChange(event) {
        const value = event.target.value;
        this.savedValue = value || '（已清空）';

        // 模拟保存到服务器
        console.log('保存到服务器:', value);
    }
}
```

**index.css**
```css
.panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
}
.panel {
    padding: 16px;
    border-radius: 4px;
}
.preview {
    background: #fff7e6;
    border: 1px solid #ffd591;
}
.saved {
    background: #f6ffed;
    border: 1px solid #b7eb8f;
}
.panel h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
}
.display {
    font-size: 16px;
    font-family: monospace;
    font-weight: 500;
}
```

---

### 示例4：监听校验失败事件

通过 `sl-invalid` 事件捕获校验失败。

**index.html**
```html
<template>
    <form onsubmit={handleSubmit}>
        <div class="form-group">
            <sl-datepicker
                name="deadline"
                label="截止日期"
                required="true"
                placeholder="必填字段"
                onsl-invalid={handleInvalid}
                onsl-change={handleChange}
            ></sl-datepicker>
        </div>
        <sl-button type="submit" variant="primary">提交</sl-button>
    </form>
    <div class="error-message" lwc:if={errorMessage}>
        {errorMessage}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class InvalidEventDatepicker extends LightningElement {
    @track errorMessage = '';

    handleSubmit(event) {
        event.preventDefault();
        const datepicker = this.template.querySelector('sl-datepicker');
        if (datepicker.reportValidity()) {
            this.errorMessage = '';
            console.log('提交成功:', datepicker.value);
        }
    }

    handleInvalid() {
        this.errorMessage = '请选择截止日期后再提交';
    }

    handleChange() {
        this.errorMessage = '';
    }
}
```

**index.css**
```css
.form-group {
    margin-bottom: 16px;
    max-width: 300px;
}
.error-message {
    margin-top: 16px;
    padding: 12px;
    background: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 4px;
    color: #ff4d4f;
    font-size: 14px;
}
```

---

### 示例5：联动多个日期选择器

通过事件实现多个日期选择器的联动逻辑。

**index.html**
```html
<template>
    <div class="form-row">
        <sl-datepicker
            label="入职日期"
            placeholder="先选择入职日期"
            onsl-change={handleJoinDateChange}
        ></sl-datepicker>

        <sl-datepicker
            label="试用期结束"
            min={joinDate}
            placeholder={probationPlaceholder}
            disabled={noProbationDate}
            value={probationEndDate}
            onsl-change={handleProbationChange}
        ></sl-datepicker>

        <sl-datepicker
            label="转正日期"
            min={probationEndDate}
            placeholder={regularPlaceholder}
            disabled={noRegularDate}
            value={regularDate}
            onsl-change={handleRegularChange}
        ></sl-datepicker>
    </div>
    <div class="summary" lwc:if={summaryText}>
        {summaryText}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class LinkedDatepickers extends LightningElement {
    @track joinDate = '';
    @track probationEndDate = '';
    @track regularDate = '';

    get noProbationDate() {
        return !this.joinDate;
    }

    get noRegularDate() {
        return !this.probationEndDate;
    }

    get probationPlaceholder() {
        return this.joinDate ? '选择试用期结束日期' : '请先选择入职日期';
    }

    get regularPlaceholder() {
        return this.probationEndDate ? '选择转正日期' : '请先选择试用期结束日期';
    }

    get summaryText() {
        if (this.joinDate && this.probationEndDate && this.regularDate) {
            return `入职: ${this.joinDate} -> 试用期结束: ${this.probationEndDate} -> 转正: ${this.regularDate}`;
        }
        return '';
    }

    handleJoinDateChange(event) {
        this.joinDate = event.target.value;
        // 自动设置 3 个月后为试用期结束日期
        if (this.joinDate) {
            const date = new Date(this.joinDate);
            date.setMonth(date.getMonth() + 3);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            this.probationEndDate = `${year}-${month}-${day}`;
        } else {
            this.probationEndDate = '';
            this.regularDate = '';
        }
    }

    handleProbationChange(event) {
        this.probationEndDate = event.target.value;
        if (!this.probationEndDate) {
            this.regularDate = '';
        }
    }

    handleRegularChange(event) {
        this.regularDate = event.target.value;
    }
}
```

**index.css**
```css
.form-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}
.summary {
    margin-top: 16px;
    padding: 12px;
    background: #f0f5ff;
    border: 1px solid #adc6ff;
    border-radius: 4px;
    font-size: 14px;
}
```

---

## 注意事项

1. **事件名称格式**：在 LWC 模板中，事件绑定使用 `onsl-change`、`onsl-input` 格式（全小写，带连字符）
2. **获取值**：统一通过 `event.target.value` 获取当前值，而非 `event.detail`
3. **sl-change 不频繁触发**：`sl-change` 仅在值最终确认时触发，适合做数据保存；`sl-input` 实时触发，适合做预览
4. **datetime 模式差异**：在 `datetime` 模式下，选择日期/时间过程中只触发 `sl-input`，点击确定后才触发 `sl-change`
5. **清除触发**：清除按钮会同时触发 `sl-input` 和 `sl-change`，值为空字符串 `''`

[返回目录](../SKILL.md)
