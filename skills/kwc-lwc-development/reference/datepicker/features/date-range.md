# 日期范围限制

[返回目录](../SKILL.md)

## 功能说明

通过 `min` 和 `max` 属性限制用户可选择的日期范围。超出范围的日期在日历面板中会被禁用（灰色不可点击），通过输入框输入的超范围日期也会被视为无效值。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `min` | 最小可选日期 | `string` | `'0001-01-01'` |
| `max` | 最大可选日期 | `string` | `'9999-12-31'` |

### 格式要求

- `min` 和 `max` 的值格式为 `yyyy-MM-dd`（如 `2024-01-01`）
- 支持 `-`、`/`、`.` 分隔符
- 超出范围的日期在日历中显示为禁用状态

---

## 代码示例

### 示例1：设置最小日期

限制用户只能选择今天及之后的日期。

**index.html**
```html
<template>
    <sl-datepicker
        label="预约日期"
        min={today}
        placeholder="只能选择今天及之后"
        help-text={helpText}
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="result" lwc:if={selectedDate}>
        选中日期: {selectedDate}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class MinDatePicker extends LightningElement {
    @track selectedDate = '';

    get today() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    get helpText() {
        return `最早可选日期: ${this.today}`;
    }

    handleChange(event) {
        this.selectedDate = event.target.value;
    }
}
```

**index.css**
```css
.result {
    margin-top: 12px;
    padding: 12px;
    background: #f6ffed;
    border-radius: 4px;
    font-size: 14px;
}
```

---

### 示例2：设置最大日期

限制用户只能选择今天及之前的日期（例如出生日期场景）。

**index.html**
```html
<template>
    <sl-datepicker
        label="出生日期"
        max={today}
        placeholder="请选择出生日期"
        help-text="不能选择未来的日期"
        onsl-change={handleChange}
    ></sl-datepicker>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class MaxDatePicker extends LightningElement {
    @track selectedDate = '';

    get today() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    handleChange(event) {
        this.selectedDate = event.target.value;
    }
}
```

---

### 示例3：设置日期区间

同时使用 `min` 和 `max` 限定一个日期范围。

**index.html**
```html
<template>
    <sl-datepicker
        label="活动报名日期"
        min="2024-03-01"
        max="2024-03-31"
        placeholder="请选择 3 月份的日期"
        help-text="报名时间：2024年3月1日 至 2024年3月31日"
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="result" lwc:if={selectedDate}>
        报名日期: {selectedDate}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class DateRangePicker extends LightningElement {
    @track selectedDate = '';

    handleChange(event) {
        this.selectedDate = event.target.value;
    }
}
```

**index.css**
```css
.result {
    margin-top: 12px;
    padding: 12px;
    background: #e6f7ff;
    border-radius: 4px;
    font-size: 14px;
}
```

---

### 示例4：动态调整日期范围

根据业务逻辑动态设置可选日期范围。

**index.html**
```html
<template>
    <div class="form-row">
        <div class="form-item">
            <label>范围类型</label>
            <div class="button-group">
                <sl-button
                    variant={isThisWeek}
                    onclick={setThisWeek}
                >本周</sl-button>
                <sl-button
                    variant={isThisMonth}
                    onclick={setThisMonth}
                >本月</sl-button>
                <sl-button
                    variant={isThisYear}
                    onclick={setThisYear}
                >本年</sl-button>
            </div>
        </div>
    </div>
    <sl-datepicker
        label="选择日期"
        min={minDate}
        max={maxDate}
        placeholder="请在范围内选择"
        help-text={rangeText}
        onsl-change={handleChange}
    ></sl-datepicker>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class DynamicRangePicker extends LightningElement {
    @track minDate = '';
    @track maxDate = '';
    @track rangeType = 'week';

    connectedCallback() {
        this.setThisWeek();
    }

    get isThisWeek() {
        return this.rangeType === 'week' ? 'primary' : 'default';
    }

    get isThisMonth() {
        return this.rangeType === 'month' ? 'primary' : 'default';
    }

    get isThisYear() {
        return this.rangeType === 'year' ? 'primary' : 'default';
    }

    get rangeText() {
        return `可选范围: ${this.minDate} 至 ${this.maxDate}`;
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    setThisWeek() {
        this.rangeType = 'week';
        const now = new Date();
        const dayOfWeek = now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        this.minDate = this.formatDate(monday);
        this.maxDate = this.formatDate(sunday);
    }

    setThisMonth() {
        this.rangeType = 'month';
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        this.minDate = this.formatDate(firstDay);
        this.maxDate = this.formatDate(lastDay);
    }

    setThisYear() {
        this.rangeType = 'year';
        const year = new Date().getFullYear();
        this.minDate = `${year}-01-01`;
        this.maxDate = `${year}-12-31`;
    }

    handleChange(event) {
        console.log('选中日期:', event.target.value);
    }
}
```

**index.css**
```css
.form-row {
    margin-bottom: 16px;
}
.form-item label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
}
.button-group {
    display: flex;
    gap: 8px;
}
```

---

### 示例5：关联日期选择器（开始/结束日期）

两个日期选择器联动，开始日期限制结束日期的最小值，结束日期限制开始日期的最大值。

**index.html**
```html
<template>
    <div class="date-range-group">
        <sl-datepicker
            label="开始日期"
            max={endDate}
            placeholder="选择开始日期"
            value={startDate}
            onsl-change={handleStartChange}
        ></sl-datepicker>

        <span class="separator">至</span>

        <sl-datepicker
            label="结束日期"
            min={startDate}
            placeholder="选择结束日期"
            value={endDate}
            onsl-change={handleEndChange}
        ></sl-datepicker>
    </div>
    <div class="result" lwc:if={rangeText}>
        选择的日期范围: {rangeText}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class LinkedDateRange extends LightningElement {
    @track startDate = '';
    @track endDate = '';

    get rangeText() {
        if (this.startDate && this.endDate) {
            return `${this.startDate} 至 ${this.endDate}`;
        }
        if (this.startDate) {
            return `${this.startDate} 至 ...`;
        }
        if (this.endDate) {
            return `... 至 ${this.endDate}`;
        }
        return '';
    }

    handleStartChange(event) {
        this.startDate = event.target.value;
    }

    handleEndChange(event) {
        this.endDate = event.target.value;
    }
}
```

**index.css**
```css
.date-range-group {
    display: flex;
    align-items: flex-end;
    gap: 12px;
}
.separator {
    padding-bottom: 8px;
    color: #999;
    font-size: 14px;
}
.result {
    margin-top: 16px;
    padding: 12px;
    background: #e6f7ff;
    border-radius: 4px;
    font-size: 14px;
}
```

---

## 注意事项

1. **min/max 格式**：`min` 和 `max` 的值格式为 `yyyy-MM-dd`，不包含时间部分（即使在 `datetime` 模式下也是按日期维度限制）
2. **禁用效果**：超出范围的日期在日历面板中显示为灰色禁用状态，无法点击
3. **输入验证**：通过输入框键入的超出范围日期会被视为无效值，失焦时回退到上一有效值
4. **"今天"按钮**：日历面板底部的"今天"快捷按钮在今天日期不在 min/max 范围内时也会被禁用
5. **动态更新**：修改 `min` 或 `max` 后，日历面板会自动更新禁用状态

[返回目录](../SKILL.md)
