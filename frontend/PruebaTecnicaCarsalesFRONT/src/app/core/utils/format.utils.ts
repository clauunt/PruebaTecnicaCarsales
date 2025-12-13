
export class FormatUtils {

  public static unionList(list?: string[]): string {
    return list ? list.join(',') : '';
  }
}
