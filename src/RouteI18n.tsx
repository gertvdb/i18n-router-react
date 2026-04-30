import type { IRouteI18N, IRouteLanguage, ITranslations } from "@/Types";
import { I18n as LinguiI18n, type Locale, type Messages } from "@lingui/core";
import { Trans } from "@lingui/react";

export class RouteI18n implements IRouteI18N {
  private readonly _i18n: LinguiI18n;
  private readonly _loaded: Set<IRouteLanguage> = new Set();
  private readonly _listeners: Set<() => void> = new Set();

  constructor(i18n: LinguiI18n) {
    this._i18n = i18n;
  }

  public static new(i18n: LinguiI18n) {
    return new RouteI18n(i18n);
  }

  trans(key: string, variables: Record<string, unknown>) {
    return <Trans id={key} values={variables} />;
  }

  t(key: string, variables?: Record<string, unknown>) {
    return this._i18n._(key, variables);
  }

  activate(language: IRouteLanguage) {
    this._i18n.activate(language);
  }

  current(): IRouteLanguage {
    return this._i18n.locale as IRouteLanguage;
  }

  subscribe(listener: () => void): () => void {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  private _notify(): void {
    this._listeners.forEach((listener) => listener());
  }

  isLoaded(language: IRouteLanguage): boolean {
    return this._loaded.has(language);
  }

  load(language: IRouteLanguage, messages: ITranslations): void {
    this._i18n.load(language as Locale, messages as Messages);
    this._loaded.add(language);
    this._notify();
  }
}
