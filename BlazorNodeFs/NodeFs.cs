using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.JSInterop;
using Microsoft.AspNetCore.Blazor.Components;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Blazor;

namespace BlazorNodeFs
{
    public class NodeFsComponent : BlazorComponent
    {
        [Parameter]
        protected string FolderPath { get; set; }
        protected List<string> files = new List<string>();
        public async Task RequestForFoldersAsync()
        {
            var value = await JSRuntime.Current.InvokeAsync<RootObject>(
                "nodeFs.requestFiles", FolderPath);

            files.Clear();

            foreach (var file in value.files)
            {
                files.Add(file);
            }
        }

        public class RootObject
        {
            public List<string> files { get; set; }
        }
    }
}
