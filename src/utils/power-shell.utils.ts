import { CodeBlock } from "../models/code-block.model";

export namespace PowerShellUtils {

    export async function copyCommandLine(
        codeBlockItems: CodeBlock[],
        startFn: () => void,
        endFn: () => void
    ) {
      if (codeBlockItems.length === 0) return;

      const psDictionary = codeBlockItems.map(codeBlockItem => `"${codeBlockItem.title}"="${btoa(unescape(encodeURIComponent(codeBlockItem.code)))}"`).join('; ');
      const rawScript = `$f=@{${psDictionary}}; $f.GetEnumerator() | % { $p=$_.Key; $d=Split-Path $p; if($d -and !(Test-Path $d)){mkdir $d -Force | Out-Null}; $bytes=[Convert]::FromBase64String($_.Value); [IO.File]::WriteAllBytes((Join-Path (Get-Location) $p), $bytes); Write-Host "✔ Créé : $p" -ForegroundColor Green }`;

      const byteArray = new Uint8Array(new Uint16Array([...rawScript].map(c => c.charCodeAt(0))).buffer);
      let binary = '';
      byteArray.forEach(b => binary += String.fromCharCode(b));

      try {
        await navigator.clipboard.writeText(`powershell -EncodedCommand ${btoa(binary)}`);
        startFn();
        setTimeout(() => endFn(), 2000);
      } catch (err) { console.error(err); }
    }

}