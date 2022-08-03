import { SettingsState } from "@/store/modules/settings/types";

export type ValuesFunc<T extends keyof SettingsState> = (
  checked: boolean
) => SettingsState[T];

export interface CheckboxSettingOptions<T extends keyof SettingsState = any>
  extends BaseSettingOptions {
  type: "checkbox" | "switch";
  checkedCondition?: (value: any) => boolean;
  values?: ValuesFunc<T>;
}

export interface NumrangeSettingOptions extends BaseSettingOptions {
  type: "numrange";
  min: number;
  max: number;
}

export interface BaseSettingOptions {
  name: keyof SettingsState;
  label: string;
  help?: string;
}

export type SettingOptions = CheckboxSettingOptions | NumrangeSettingOptions;
