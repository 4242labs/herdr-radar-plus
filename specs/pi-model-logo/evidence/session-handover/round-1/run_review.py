import subprocess,pathlib,time,os,signal,json
root=pathlib.Path('/Users/42piratas/42labs/review-artifacts/pi-model-logo-opus-review')
start=time.monotonic()
(root/'session.json').write_text(json.dumps({'session_id':'929cee82-d5cf-4bca-b24b-80809101e909','requested_model':'opus','cap_seconds':900,'start_monotonic':start}))
args=['claude','-p',(root/'brief.txt').read_text(),'--model','opus','--session-id','929cee82-d5cf-4bca-b24b-80809101e909','--output-format','json','--restricted','--safe-mode','--strict-mcp-config','--mcp-config','{"mcpServers":{}}','--settings',str(root/'settings.json'),'--setting-sources','','--tools','Read,Glob,Grep','--permission-mode','dontAsk','--permission-prompts','none','--disable-slash-commands','--add-dir','/Users/42piratas/42labs/herdr-radar-plus','/opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent']
with (root/'result.json').open('w') as out,(root/'stderr.txt').open('w') as err:
 p=subprocess.Popen(args,cwd=str(root),stdout=out,stderr=err,start_new_session=True)
 try: code=p.wait(timeout=max(1,900-(time.monotonic()-start)))
 except subprocess.TimeoutExpired:
  os.killpg(p.pid,signal.SIGTERM)
  try:p.wait(timeout=5)
  except subprocess.TimeoutExpired:os.killpg(p.pid,signal.SIGKILL);p.wait()
  code=124
(root/'execution.json').write_text(json.dumps({'exit_code':code,'elapsed_seconds':time.monotonic()-start,'pid':p.pid,'stopped':p.poll() is not None}))
print('Reviewer exited',code,flush=True)
