using System.Text.RegularExpressions;

namespace PruebaTecnicaCarsalesAPI.Utils
{
    public static class PaginationHelper
    {
        public static string? ExtractPageNumber(string? url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return null;

            //simplifica la url a un número de página
            var match = Regex.Match(url, @"[?&]page=(\d+)", RegexOptions.IgnoreCase);
            if (match.Success && int.TryParse(match.Groups[1].Value, out int pageNumber))
                return pageNumber.ToString();

            return null;
        }
    }
}
