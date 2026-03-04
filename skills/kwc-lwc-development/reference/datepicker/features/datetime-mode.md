# 日期时间模式

[返回目录](../SKILL.md)

## 功能说明

通过设置 `type="datetime"`，Datepicker 组件切换为日期时间选择模式，允许用户同时选择日期和时间（时、分、秒）。在桌面端，日历面板右侧会显示时间选择面板，并需要点击"确定"按钮确认选择；在移动端，时间选择通过底部滚轮面板进行。

## API 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 选择器类型 | `'date' \| 'datetime'` | `'date'` |

### 类型对比

| 特性 | `date` 模式 | `datetime` 模式 |
|------|-------------|-----------------|
| 值格式 | `yyyy-MM-dd` | `yyyy-MM-dd HH:mm:ss` |
| 时间面板 | 无 | 有（时/分/秒） |
| 确认按钮 | 无（选择日期即确认） | 有（需点击确定） |
| 输入验证格式 | `yyyy-MM-dd` | `yyyy-MM-dd HH:mm:ss` |
| 失焦行为 | 提交当前值 | 回退到上一有效值 |
| 示例值 | `2024-01-15` | `2024-01-15 14:30:00` |

---

## 代码示例

### 示例1：基础日期时间选择

设置 `type="datetime"` 开启日期时间选择模式。

**index.html**
```html
<template>
    <sl-datepicker
        label="选择日期时间"
        type="datetime"
        placeholder="请选择日期和时间"
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="result" lwc:if={selectedDatetime}>
        选中的日期时间: {selectedDatetime}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class BasicDatetimePicker extends LightningElement {
    @track selectedDatetime = '';

    handleChange(event) {
        this.selectedDatetime = event.target.value;
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

### 示例2：设置默认日期时间

通过 `value` 设置初始日期时间，格式必须为 `yyyy-MM-dd HH:mm:ss`。

**index.html**
```html
<template>
    <sl-datepicker
        label="会议时间"
        type="datetime"
        value="2024-06-15 09:30:00"
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="result">当前值: {currentValue}</div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class DefaultDatetimePicker extends LightningElement {
    @track currentValue = '2024-06-15 09:30:00';

    handleChange(event) {
        this.currentValue = event.target.value;
    }
}
```

**index.css**
```css
.result {
    margin-top: 12px;
    color: #666;
    font-size: 14px;
}
```

---

### 示例3：日期与日期时间对比

并排展示两种模式的差异。

**index.html**
```html
<template>
    <div class="comparison">
        <div class="picker-wrapper">
            <sl-datepicker
                label="日期模式 (date)"
                type="date"
                placeholder="选择日期"
                onsl-change={handleDateChange}
            ></sl-datepicker>
            <div class="value">值: {dateValue}</div>
        </div>

        <div class="picker-wrapper">
            <sl-datepicker
                label="日期时间模式 (datetime)"
                type="datetime"
                placeholder="选择日期和时间"
                onsl-change={handleDatetimeChange}
            ></sl-datepicker>
            <div class="value">值: {datetimeValue}</div>
        </div>
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class ComparisonDatepicker extends LightningElement {
    @track dateValue = '（未选择）';
    @track datetimeValue = '（未选择）';

    handleDateChange(event) {
        this.dateValue = event.target.value || '（未选择）';
    }

    handleDatetimeChange(event) {
        this.datetimeValue = event.target.value || '（未选择）';
    }
}
```

**index.css**
```css
.comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}
.picker-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.value {
    font-size: 13px;
    color: #666;
    font-family: monospace;
    word-break: break-all;
}
```

---

### 示例4：日期时间带范围限制

结合 `min` 和 `max` 限制日期时间的可选范围。

**index.html**
```html
<template>
    <sl-datepicker
        label="预约时间"
        type="datetime"
        min="2024-01-01"
        max="2024-12-31"
        placeholder="请选择 2024 年内的时间"
        help-text="仅可选择 2024 年内的日期"
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="result" lwc:if={selectedValue}>
        预约时间: {selectedValue}
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';

export default class DatetimeRangePicker extends LightningElement {
    @track selectedValue = '';

    handleChange(event) {
        this.selectedValue = event.target.value;
    }
}
```

**index.css**
```css
.result {
    margin-top: 12px;
    padding: 12px;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 4px;
    font-size: 14px;
}
```

---

### 示例5：动态切换模式

动态切换 `date` 和 `datetime` 模式。

**index.html**
```html
<template>
    <div class="toolbar">
        <sl-button
            variant={dateVariant}
            onclick={switchToDate}
        >日期模式</sl-button>
        <sl-button
            variant={datetimeVariant}
            onclick={switchToDatetime}
        >日期时间模式</sl-button>
    </div>
    <sl-datepicker
        label="动态切换"
        type={pickerType}
        placeholder={placeholderText}
        onsl-change={handleChange}
    ></sl-datepicker>
    <div class="result">
        <div>当前模式: {pickerType}</div>
        <div>当前值: {currentValue}</div>
    </div>
</template>
```

**index.js**
```js
import { LightningElement, track } from 'lwc';
import '@kdcloudjs/shoelace/dist/components/datepicker/datepicker.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class DynamicModeDatepicker extends LightningElement {
    @track pickerType = 'date';
    @track currentValue = '';

    get dateVariant() {
        return this.pickerType === 'date' ? 'primary' : 'default';
    }

    get datetimeVariant() {
        return this.pickerType === 'datetime' ? 'primary' : 'default';
    }

    get placeholderText() {
        return this.pickerType === 'date'
            ? '请选择日期'
            : '请选择日期和时间';
    }

    switchToDate() {
        this.pickerType = 'date';
        this.currentValue = '';
    }

    switchToDatetime() {
        this.pickerType = 'datetime';
        this.currentValue = '';
    }

    handleChange(event) {
        this.currentValue = event.target.value;
    }
}
```

**index.css**
```css
.toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}
.result {
    margin-top: 12px;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 14px;
    color: #666;
}
.result div {
    margin-bottom: 4px;
}
```

---

## 注意事项

1. **值格式严格匹配**：`datetime` 模式下值格式必须为 `yyyy-MM-dd HH:mm:ss`，缺少时间部分会导致解析失败
2. **确认行为差异**：`date` 模式选择日期后自动关闭弹窗并提交；`datetime` 模式需要点击"确定"按钮才提交
3. **失焦行为差异**：`datetime` 模式下，如果弹窗打开时失焦，会回退到上一有效值而非提交当前值
4. **切换模式清空值**：从 `date` 切换到 `datetime` 模式（或反之）时，建议清空当前值，因为值格式不兼容
5. **时间面板**：桌面端日历面板右侧显示时/分/秒三列滚动选择；移动端通过底部滚轮选择

[返回目录](../SKILL.md)
