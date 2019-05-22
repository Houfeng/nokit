import { AbstractLoader } from "../AbstractLoader";
import { CONFIG_ENTITY_KEY } from "./constants";
import { resolve } from "path";

const { Parser } = require("confman");

/**
 * 配置加载器
 */
export class ConfigLoader<T = any> extends AbstractLoader<T> {
  /**
   * 加载应用配置
   */
  public async load() {
    const { root } = this.app.options;
    const { path } = this.options;
    const configFile = resolve(root, path);
    const configParser = new Parser({ env: this.app.env });
    const configObject = configParser.load(configFile);
    this.app.container.registerValue(CONFIG_ENTITY_KEY, configObject);
  }
}
