@ECHO OFF

rem Generate deps.js
closure-library\closure\bin\build\depswriter.py ^
--root=closure-library ^
--root=js\src ^
--output_file=js\out\deps.js

rem Compile all files into app.min.js
closure-library\closure\bin\build\closurebuilder.py ^
--root=closure-library ^
--root=js\src ^
--namespace=asv.App ^
--output_mode=compiled ^
--compiler_jar=closure-library\closure\bin\compiler.jar ^
--output_file=js\out\app.min.js ^
--compiler_flags="--js=js\out\deps.js" ^
--compiler_flags="--externs=js\src\externs.js" ^
--compiler_flags="--jscomp_error=accessControls" ^
--compiler_flags="--jscomp_error=ambiguousFunctionDecl" ^
--compiler_flags="--jscomp_error=checkDebuggerStatement" ^
--compiler_flags="--jscomp_error=checkRegExp" ^
--compiler_flags="--jscomp_error=checkTypes" ^
--compiler_flags="--jscomp_error=checkVars" ^
--compiler_flags="--jscomp_error=const" ^
--compiler_flags="--jscomp_error=constantProperty" ^
--compiler_flags="--jscomp_error=deprecated" ^
--compiler_flags="--jscomp_error=duplicate" ^
--compiler_flags="--jscomp_error=es5Strict" ^
--compiler_flags="--jscomp_error=externsValidation" ^
--compiler_flags="--jscomp_error=fileoverviewTags" ^
--compiler_flags="--jscomp_error=globalThis" ^
--compiler_flags="--jscomp_error=internetExplorerChecks" ^
--compiler_flags="--jscomp_error=invalidCasts" ^
--compiler_flags="--jscomp_error=missingProperties" ^
--compiler_flags="--jscomp_error=nonStandardJsDocs" ^
--compiler_flags="--jscomp_error=strictModuleDepCheck" ^
--compiler_flags="--jscomp_error=suspiciousCode" ^
--compiler_flags="--jscomp_error=undefinedNames" ^
--compiler_flags="--jscomp_error=undefinedVars" ^
--compiler_flags="--jscomp_error=unknownDefines" ^
--compiler_flags="--jscomp_error=visibility"