namespace PruebaTecnicaCarsalesAPI.Utils
{
    public static class FormatHelper
    {
        public static string? ExtractId(string? url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return null;

            var segments = url.TrimEnd('/').Split('/');
            if (segments.Length > 0)
                return segments[^1]; 

            return null;
        }

        public static List<string> ExtractIdList(List<string>? urls)
        {
            if (urls == null && urls.Count == 0)
                return new List<string>();

            List<string> convertedList = new List<string>();
            foreach (var url in urls)
            {
                var id = ExtractId(url);
                if (id != null)
                    convertedList.Add(id);
            }

            return convertedList;
        }
    }
}
