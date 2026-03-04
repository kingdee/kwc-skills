# Timepicker 时间选择器

输入或选择时间的控件，支持时、分、秒的滚动选择。

## 特性概览

- **弹出面板**：点击输入框弹出时间滚动面板（时/分/秒三列），桌面端使用 Popup，移动端自动切换为 Drawer
- **手动输入**：支持在输入框中直接键入时间值（格式 `HH:mm:ss`），输入合法时实时同步面板
- **自定义格式**：通过 `format` 属性控制时间格式，默认 `HH:mm:ss`
- **清除按钮**：默认启用清除按钮（`clearable` 默认为 `true`）
- **键盘操作**：支持 `Enter` 确认选择、`Escape` 关闭面板
- **表单集成**：实现标准表单控件接口，支持 `name`、`required`、`form` 等属性
- **响应式**：自动检测屏幕宽度，窄屏（<500px）自动切换移动端交互模式
- **多种样式**：支持 `filled`（填充）、`pill`（胶囊）、`size`（尺寸）等外观配置

## 基础用法

最简单的时间选择器用法，点击输入框即可打开时间面板。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el"></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerBasic extends KingdeeElement {}
```

## 设置初始值

使用 `value` 属性设置初始时间值，格式为 `HH:mm:ss`。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" value="14:30:00"></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerInitialValue extends KingdeeElement {}
```

## 标签

使用 `label` 属性为选择器提供标签。若标签内需包含 HTML，请改用 `label` 插槽。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" label="选择时间"></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerLabel extends KingdeeElement {}
```

## 帮助文本

使用 `help-text` 属性为选择器添加描述性帮助文本。若帮助文本内需包含 HTML，请改用 `help-text` 插槽。

```html
<template>
  <sl-timepicker
    kwc:external
    class="timepicker-el"
    label="会议时间"
    help-text="请选择会议开始时间"
  ></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerHelpText extends KingdeeElement {}
```

## 占位符

使用 `placeholder` 属性添加占位文本。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" placeholder="HH:mm:ss"></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerPlaceholder extends KingdeeElement {}
```

## 可清除

`clearable` 属性默认启用（`true`），当有值时会显示清除按钮。设置 `clearable` 为 `false` 可以隐藏清除按钮。

```html
<template>
  <div class="timepicker-group">
    <sl-timepicker kwc:external class="timepicker-el" value="09:30:00" placeholder="默认可清除"></sl-timepicker>
    <sl-timepicker kwc:external class="timepicker-no-clear" value="09:30:00" placeholder="不可清除"></sl-timepicker>
  </div>
</template>
```
```css
.timepicker-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 230px;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerClearable extends KingdeeElement {
  renderedCallback() {
    if (this._rendered) return;
    this._rendered = true;

    const noClear = this.template.querySelector('.timepicker-no-clear');
    if (noClear) {
      noClear.clearable = false;
    }
  }
}
```

## 填充样式

添加 `filled` 属性可绘制填充样式的选择器。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" placeholder="Filled" filled></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerFilled extends KingdeeElement {}
```

## 胶囊样式

使用 `pill` 属性可为选择器设置椭圆圆角样式。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" placeholder="Pill" pill></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerPill extends KingdeeElement {}
```

## 尺寸

使用 `size` 属性更改时间选择器的尺寸，支持 `small`、`medium`（默认）、`large`。

```html
<template>
  <div class="timepicker-group">
    <sl-timepicker kwc:external class="timepicker-small" placeholder="Small" size="small"></sl-timepicker>
    <sl-timepicker kwc:external class="timepicker-medium" placeholder="Medium" size="medium"></sl-timepicker>
    <sl-timepicker kwc:external class="timepicker-large" placeholder="Large" size="large"></sl-timepicker>
  </div>
</template>
```
```css
.timepicker-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 230px;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerSize extends KingdeeElement {}
```

## 禁用

使用 `disabled` 属性禁用选择器，禁用后无法打开面板、无法输入。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" value="10:00:00" disabled></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerDisabled extends KingdeeElement {}
```

## 只读

使用 `readonly` 属性设置只读状态，可以看到值但不能修改。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" value="10:00:00" readonly></sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerReadonly extends KingdeeElement {}
```

## 必填校验

使用 `required` 属性标记为必填，配合表单使用时可进行校验。

```html
<template>
  <form class="time-form">
    <sl-timepicker
      kwc:external
      class="timepicker-el"
      label="上班时间"
      required
      help-text="此字段为必填"
    ></sl-timepicker>
    <sl-button kwc:external class="submit-btn" type="submit" variant="primary">提交</sl-button>
  </form>
</template>
```
```css
.time-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 230px;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class TimepickerRequired extends KingdeeElement {
  renderedCallback() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    const form = this.template.querySelector('.time-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const timepicker = this.template.querySelector('.timepicker-el');
        if (timepicker && timepicker.reportValidity()) {
          console.log('提交时间:', timepicker.value);
        }
      });
    }
  }
}
```

## Hoist（提升定位）

当时间选择器位于溢出隐藏的容器中时，弹出面板可能被裁剪。添加 `hoist` 属性可使面板使用 `fixed` 定位策略脱离容器限制。

```html
<template>
  <div class="overflow-container">
    <sl-timepicker kwc:external class="timepicker-el" placeholder="Hoisted" hoist></sl-timepicker>
  </div>
</template>
```
```css
.overflow-container {
  overflow: hidden;
  border: 1px solid #ccc;
  padding: 16px;
  height: 80px;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerHoist extends KingdeeElement {}
```

## 监听时间变化事件

通过监听 `sl-change` 和 `sl-input` 事件获取时间值变化。

- `sl-change`：用户**确认提交**值的修改时触发（点击面板"确定"按钮、按 Enter、失焦时）
- `sl-input`：值**实时变化**时触发（用户在面板滚动选择时、在输入框中输入时）

```html
<template>
  <div class="timepicker-demo">
    <div class="event-info">
      <p>当前值 (sl-change): <span class="change-value">-</span></p>
      <p>实时值 (sl-input): <span class="input-value">-</span></p>
    </div>
    <sl-timepicker kwc:external class="timepicker-el" placeholder="选择时间"></sl-timepicker>
  </div>
</template>
```
```css
.timepicker-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 280px;
}
.event-info {
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
}
.event-info p {
  margin: 4px 0;
  font-size: 14px;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerEvent extends KingdeeElement {
  renderedCallback() {
    if (this._eventsBound) return;
    this._eventsBound = true;
    this.bindShoelaceEvents();
  }

  get shoelaceEventBindings() {
    return [
      ['.timepicker-el', 'sl-change', this.handleChange],
      ['.timepicker-el', 'sl-input', this.handleInput]
    ];
  }

  bindShoelaceEvents() {
    this._boundHandlers = this.shoelaceEventBindings.map(([selector, event, handler]) => {
      const el = this.template.querySelector(selector);
      if (el) {
        const boundHandler = handler.bind(this);
        el.addEventListener(event, boundHandler);
        return { el, event, boundHandler };
      }
      return null;
    }).filter(Boolean);
  }

  handleChange(event) {
    const el = this.template.querySelector('.change-value');
    if (el) {
      el.textContent = event.target.value || '-';
    }
    console.log('sl-change:', event.target.value);
  }

  handleInput(event) {
    const el = this.template.querySelector('.input-value');
    if (el) {
      el.textContent = event.target.value || '-';
    }
  }

  disconnectedCallback() {
    if (this._boundHandlers) {
      this._boundHandlers.forEach(({ el, event, boundHandler }) => {
        el.removeEventListener(event, boundHandler);
      });
    }
  }
}
```

## 监听焦点与清除事件

```html
<template>
  <div class="timepicker-demo">
    <p class="event-log">最近事件: <span class="log-text">无</span></p>
    <sl-timepicker kwc:external class="timepicker-el" value="08:00:00"></sl-timepicker>
  </div>
</template>
```
```css
.timepicker-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 230px;
}
.event-log {
  font-size: 14px;
  color: #666;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerFocusBlur extends KingdeeElement {
  renderedCallback() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    const picker = this.template.querySelector('.timepicker-el');
    if (!picker) return;

    this._handlers = [
      ['sl-focus', () => this.showLog('获得焦点 (sl-focus)')],
      ['sl-blur', () => this.showLog('失去焦点 (sl-blur)')],
      ['sl-clear', () => this.showLog('已清除 (sl-clear)')]
    ];

    this._handlers.forEach(([event, handler]) => {
      picker.addEventListener(event, handler);
    });
  }

  showLog(text) {
    const el = this.template.querySelector('.log-text');
    if (el) {
      el.textContent = text;
    }
  }

  disconnectedCallback() {
    const picker = this.template.querySelector('.timepicker-el');
    if (picker && this._handlers) {
      this._handlers.forEach(([event, handler]) => {
        picker.removeEventListener(event, handler);
      });
    }
  }
}
```

## 通过 JavaScript 动态设置值

通过 JavaScript 动态读取和设置时间选择器的值。

```html
<template>
  <div class="timepicker-demo">
    <div class="controls">
      <sl-button kwc:external class="btn-morning" size="small">设为上午9点</sl-button>
      <sl-button kwc:external class="btn-noon" size="small">设为中午12点</sl-button>
      <sl-button kwc:external class="btn-clear" size="small">清空</sl-button>
    </div>
    <sl-timepicker kwc:external class="timepicker-el" placeholder="选择时间"></sl-timepicker>
  </div>
</template>
```
```css
.timepicker-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 280px;
}
.controls {
  display: flex;
  gap: 8px;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class TimepickerDynamic extends KingdeeElement {
  renderedCallback() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    const picker = this.template.querySelector('.timepicker-el');
    const btnMorning = this.template.querySelector('.btn-morning');
    const btnNoon = this.template.querySelector('.btn-noon');
    const btnClear = this.template.querySelector('.btn-clear');

    if (btnMorning) {
      btnMorning.addEventListener('click', () => {
        if (picker) {
          picker.value = '09:00:00';
        }
      });
    }

    if (btnNoon) {
      btnNoon.addEventListener('click', () => {
        if (picker) {
          picker.value = '12:00:00';
        }
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        if (picker) {
          picker.value = '';
        }
      });
    }
  }
}
```

## 自定义校验

使用 `setCustomValidity()` 方法设置自定义校验消息，实现业务逻辑校验。

```html
<template>
  <div class="timepicker-demo">
    <sl-timepicker
      kwc:external
      class="timepicker-el"
      label="工作时间"
      help-text="仅允许选择 09:00 - 18:00 之间的时间"
    ></sl-timepicker>
    <sl-button kwc:external class="btn-validate" variant="primary" size="small">校验</sl-button>
  </div>
</template>
```
```css
.timepicker-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 280px;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';
import '@kdcloudjs/shoelace/dist/components/button/button.js';

export default class TimepickerValidation extends KingdeeElement {
  renderedCallback() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    const picker = this.template.querySelector('.timepicker-el');
    const btn = this.template.querySelector('.btn-validate');

    if (picker) {
      this._handleChange = () => {
        // 值变化时清除之前的自定义校验
        picker.setCustomValidity('');
      };
      picker.addEventListener('sl-change', this._handleChange);
    }

    if (btn) {
      btn.addEventListener('click', () => {
        if (!picker) return;
        const val = picker.value;

        if (!val) {
          picker.setCustomValidity('请选择一个时间');
        } else if (val < '09:00:00' || val > '18:00:00') {
          picker.setCustomValidity('时间必须在 09:00 到 18:00 之间');
        } else {
          picker.setCustomValidity('');
        }
        picker.reportValidity();
      });
    }
  }

  disconnectedCallback() {
    const picker = this.template.querySelector('.timepicker-el');
    if (picker && this._handleChange) {
      picker.removeEventListener('sl-change', this._handleChange);
    }
  }
}
```

## 多个时间选择器组合（时间范围）

组合两个时间选择器实现起止时间选择。

```html
<template>
  <div class="time-range">
    <sl-timepicker
      kwc:external
      class="start-time"
      label="开始时间"
      placeholder="开始"
    ></sl-timepicker>
    <span class="range-separator">~</span>
    <sl-timepicker
      kwc:external
      class="end-time"
      label="结束时间"
      placeholder="结束"
    ></sl-timepicker>
  </div>
</template>
```
```css
.time-range {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.range-separator {
  line-height: 40px;
  color: #999;
}
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';

export default class TimepickerRange extends KingdeeElement {
  renderedCallback() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    const startPicker = this.template.querySelector('.start-time');
    const endPicker = this.template.querySelector('.end-time');

    if (startPicker) {
      this._handleStartChange = () => {
        this.validateRange();
      };
      startPicker.addEventListener('sl-change', this._handleStartChange);
    }

    if (endPicker) {
      this._handleEndChange = () => {
        this.validateRange();
      };
      endPicker.addEventListener('sl-change', this._handleEndChange);
    }
  }

  validateRange() {
    const startPicker = this.template.querySelector('.start-time');
    const endPicker = this.template.querySelector('.end-time');

    if (!startPicker || !endPicker) return;

    const startVal = startPicker.value;
    const endVal = endPicker.value;

    // 如果两个值都存在，校验结束时间大于开始时间
    if (startVal && endVal && endVal <= startVal) {
      endPicker.setCustomValidity('结束时间必须晚于开始时间');
      endPicker.reportValidity();
    } else {
      endPicker.setCustomValidity('');
    }
  }

  disconnectedCallback() {
    const startPicker = this.template.querySelector('.start-time');
    const endPicker = this.template.querySelector('.end-time');
    if (startPicker && this._handleStartChange) {
      startPicker.removeEventListener('sl-change', this._handleStartChange);
    }
    if (endPicker && this._handleEndChange) {
      endPicker.removeEventListener('sl-change', this._handleEndChange);
    }
  }
}
```

## 使用插槽自定义前缀/后缀

通过 `prefix` 和 `suffix` 插槽自定义输入框的前缀和后缀内容。

```html
<template>
  <sl-timepicker kwc:external class="timepicker-el" placeholder="选择时间">
    <sl-icon kwc:external slot="prefix" name="alarm"></sl-icon>
  </sl-timepicker>
</template>
```
```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';
import '@kdcloudjs/shoelace/dist/components/icon/icon.js';

export default class TimepickerSlot extends KingdeeElement {}
```

## Properties

| 属性          | 描述                                                         | 类型                              | 默认值       |
| ------------- | ------------------------------------------------------------ | --------------------------------- | ------------ |
| value         | 时间选择器的当前值，格式由 `format` 决定，默认 `HH:mm:ss`。 | `string`                          | `''`         |
| format        | 时间格式字符串。                                             | `string`                          | `'HH:mm:ss'` |
| name          | 表单名称，随表单数据以"名称/值"对的形式提交。                | `string`                          | `''`         |
| placeholder   | 为空时的占位提示文本。                                       | `string`                          | `''`         |
| label         | 标签文本。                                                   | `string`                          | `''`         |
| help-text     | 辅助说明文本。                                               | `string`                          | `''`         |
| size          | 时间选择器的尺寸。                                           | `'small' \| 'medium' \| 'large'`  | `'medium'`   |
| filled        | 是否使用填充样式。                                           | `boolean`                         | `false`      |
| pill          | 是否为圆角胶囊样式。                                         | `boolean`                         | `false`      |
| clearable     | 是否显示清除按钮（当有值时）。                               | `boolean`                         | `true`       |
| disabled      | 是否禁用输入。                                               | `boolean`                         | `false`      |
| readonly      | 是否为只读状态。                                             | `boolean`                         | `false`      |
| required      | 是否为必填项。                                               | `boolean`                         | `false`      |
| hoist         | 是否使用 `fixed` 定位策略提升弹出面板，避免被溢出容器裁剪。  | `boolean`                         | `false`      |
| form          | 关联的表单 ID。                                              | `string`                          | `''`         |
| autofocus     | 是否自动获取焦点。                                           | `boolean`                         | `false`      |

## Slots

| 名称       | 描述                                            |
| ---------- | ----------------------------------------------- |
| label      | 时间选择器的标签。也可以使用 `label` 属性。     |
| prefix     | 在输入框前部添加图标或元素。                    |
| suffix     | 在输入框后部添加图标或元素（默认显示时钟图标）。|
| clear-icon | 自定义清除按钮的图标。                          |
| help-text  | 辅助说明文字。也可以使用 `help-text` 属性。     |

## Events

| 事件名称   | 描述                                                                               |
| ---------- | ---------------------------------------------------------------------------------- |
| sl-change  | 当用户确认值的修改时触发（点击"确定"按钮、按 Enter 键、输入框失焦时）。            |
| sl-input   | 当值实时变化时触发（用户在面板中滚动选择时、在输入框中输入合法时间时）。            |
| sl-focus   | 当控件获得焦点时触发。                                                             |
| sl-blur    | 当控件失去焦点时触发。                                                             |
| sl-clear   | 当清除按钮被激活时触发。                                                           |

### 事件监听示例

**重要**：在 KWC LWC 中，Shoelace 的自定义事件（如 `sl-change`、`sl-input`）**必须**在 JavaScript 的 `renderedCallback` 中绑定，**禁止**在 HTML 模板中使用 `onsl-change` 这样的写法。

```javascript
// 正确方式：在 renderedCallback 中绑定事件
renderedCallback() {
  if (this._eventsBound) return;
  this._eventsBound = true;

  const timepicker = this.template.querySelector('.timepicker-el');
  if (timepicker) {
    this._handleChange = this.handleChange.bind(this);
    this._handleInput = this.handleInput.bind(this);
    timepicker.addEventListener('sl-change', this._handleChange);
    timepicker.addEventListener('sl-input', this._handleInput);
  }
}

handleChange(event) {
  console.log('确认选择的时间:', event.target.value);
}

handleInput(event) {
  console.log('实时变化的时间:', event.target.value);
}
```

## Methods

| 方法                | 描述                                     | 参数                  |
| ------------------- | ---------------------------------------- | --------------------- |
| focus()             | 使时间选择器获得焦点并打开面板。         | options: FocusOptions |
| blur()              | 使时间选择器失去焦点并关闭面板。         | -                     |
| checkValidity()     | 检查有效性但不显示消息。                 | -                     |
| getForm()           | 获取关联的表单元素。                     | -                     |
| reportValidity()    | 检查有效性并在无效时显示浏览器原生消息。 | -                     |
| setCustomValidity() | 设置自定义校验消息。传空字符串清除校验。 | message: string       |

## Parts

| 名称                        | 描述                         |
| --------------------------- | ---------------------------- |
| input                       | 内部输入框元素。             |
| popup                       | 弹出面板容器（桌面端）。     |
| panel                       | 时间面板。                   |
| time-panel-base             | 时间面板基础容器。           |
| time-panel-header           | 时间面板头部（显示当前时间）。|
| time-panel-columns          | 时间面板滚动列容器。         |
| time-panel-column           | 时间面板单列（时/分/秒）。   |
| time-panel-hour             | 小时列。                     |
| time-panel-minute           | 分钟列。                     |
| time-panel-second           | 秒列。                       |
| time-panel-item             | 时间面板中的单个时间项。     |
| time-panel-footer           | 时间面板底部（确定按钮）。   |
| time-panel-margin-cell-first| 面板间距单元（首列）。       |
| time-panel-margin-cell      | 面板间距单元。               |

## 交互行为说明

### 桌面端
- **打开面板**：点击输入框或尾部时钟图标打开时间面板（Popup 定位于输入框下方）
- **滚动选择**：面板包含时/分/秒三列，鼠标悬停列可滚动，点击项即选中
- **确认选择**：点击面板底部"确定"按钮或按 `Enter` 键确认选择并关闭面板
- **取消选择**：按 `Escape` 键或点击面板外部区域关闭面板，值回退到上次有效值
- **手动输入**：在输入框中直接键入 `HH:mm:ss` 格式时间，输入合法时实时同步面板

### 移动端（屏幕宽度 < 500px）
- 自动切换为 Drawer 抽屉模式
- 输入框变为只读，点击后弹出抽屉面板
- 抽屉面板包含"确定"、"取消"、"清除"操作按钮

### 值校验
- 默认格式 `HH:mm:ss` 要求值匹配 `^\d{2}:\d{2}:\d{2}$`
- 非法输入不会更新 `value`，失焦时自动回退到上次有效值
- 空字符串 `''` 视为合法值（清空状态）

## 最佳实践

### 1. 正确导入组件

```javascript
import '@kdcloudjs/shoelace/dist/components/timepicker/timepicker.js';
```

### 2. 添加 kwc:external 属性

在 HTML 模板中使用时，**必须**添加 `kwc:external` 属性：

```html
<!-- 正确 -->
<sl-timepicker kwc:external class="timepicker-el"></sl-timepicker>

<!-- 错误：缺少 kwc:external -->
<sl-timepicker class="timepicker-el"></sl-timepicker>
```

### 3. 使用 class 而非 id 选择器

```html
<!-- 正确 -->
<sl-timepicker kwc:external class="timepicker-el"></sl-timepicker>

<!-- 错误 -->
<sl-timepicker kwc:external id="timepicker-el"></sl-timepicker>
```

### 4. 在 renderedCallback 中绑定事件

```javascript
renderedCallback() {
  if (this._eventsBound) return;
  this._eventsBound = true;

  const timepicker = this.template.querySelector('.timepicker-el');
  if (timepicker) {
    this._handleChange = this.handleChange.bind(this);
    timepicker.addEventListener('sl-change', this._handleChange);
  }
}
```

### 5. 在 disconnectedCallback 中移除事件监听

```javascript
disconnectedCallback() {
  const timepicker = this.template.querySelector('.timepicker-el');
  if (timepicker && this._handleChange) {
    timepicker.removeEventListener('sl-change', this._handleChange);
  }
}
```

### 6. 禁止在 HTML 模板中使用自闭合标签

```html
<!-- 正确 -->
<sl-timepicker kwc:external class="timepicker-el"></sl-timepicker>

<!-- 错误：自闭合标签 -->
<sl-timepicker kwc:external class="timepicker-el" />
```

### 7. 值格式说明

时间值必须为 `HH:mm:ss` 格式字符串（24 小时制，两位补零）：

```javascript
// 正确
picker.value = '09:05:00';
picker.value = '23:59:59';
picker.value = '';  // 清空

// 错误
picker.value = '9:5:0';     // 不补零
picker.value = '09:05';     // 缺少秒
picker.value = '2:30 PM';   // 12 小时制
```

## 常见问题

### Q: 为什么设置 value 后面板没有滚动到对应时间？

A: 确保 `value` 格式为 `HH:mm:ss`（如 `"09:30:00"`）。非法格式的值会被组件忽略并清空。面板打开时会自动滚动到当前选中时间。

### Q: 为什么时间变化事件没有触发？

A: 请确保在 `renderedCallback` 中通过 `addEventListener` 绑定了 `sl-change` 事件，并且添加了防重复绑定检查 (`if (this._eventsBound) return`)。**禁止**在 HTML 模板中绑定 `sl-change` 等 Shoelace 自定义事件。

### Q: sl-change 和 sl-input 有什么区别？

A: `sl-input` 在用户每次滚动面板选择或输入合法时间时即触发（实时变化），适合做预览、联动等；`sl-change` 仅在用户确认提交值时触发（点击确定、按 Enter、失焦），适合做最终的数据保存和业务逻辑处理。

### Q: 弹出面板被父容器遮挡怎么办？

A: 添加 `hoist` 属性，使面板使用 `fixed` 定位策略：`<sl-timepicker kwc:external hoist></sl-timepicker>`。

### Q: 如何通过 JavaScript 读取当前选中时间？

A: 直接访问 `value` 属性即可：
```javascript
const timepicker = this.template.querySelector('.timepicker-el');
const currentTime = timepicker.value; // 例如 "14:30:00" 或 ""
```
