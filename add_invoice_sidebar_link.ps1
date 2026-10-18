$ErrorActionPreference = 'Stop'
$invoiceLink = '<a href="invoices.html" class="nav-item"><span>🧾</span><span>Invoices</span></a>'
$files = Get-ChildItem -Path . -Filter '*.html' -File | Where-Object { $_.Name -notin @('invoices.html') }
foreach ($file in $files) {
  $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  if ($content -match 'href=["'']invoices\.html["'']') { continue }
  # Insert beside Customers in the existing sidebar. If no customers nav link exists, skip rather than guess.
  $pattern = '(?is)(<a\b[^>]*href=["''][^"'']*customers\.html[^"'']*["''][^>]*>.*?</a>)'
  if ($content -match $pattern) {
    $content = [regex]::Replace($content, $pattern, ('$1' + "`r`n        " + $invoiceLink), 1)
    Set-Content -LiteralPath $file.FullName -Value $content -Encoding UTF8
    Write-Host "Added Invoices sidebar link: $($file.Name)"
  }
}
Write-Host 'Done. Review the changed HTML files in VS Code before committing.'
