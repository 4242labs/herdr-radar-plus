import subprocess,pathlib,time,json,shlex,os,signal
root=pathlib.Path(__file__).parent
remote='/home/42piratas/review-artifacts/pi-model-logo-opus-review-recovery'
sid='929cee82-d5cf-4bca-b24b-80809101e909'
args=['/home/42piratas/.npm-global/bin/claude','-p',(root/'recovery-brief.txt').read_text(),'--model','opus','--session-id',sid,'--output-format','stream-json','--verbose','--restricted','--safe-mode','--strict-mcp-config','--mcp-config','{"mcpServers":{}}','--settings',remote+'/recovery-settings.json','--setting-sources','','--tools','Read,Glob,Grep','--permission-mode','dontAsk','--permission-prompts','none','--disable-slash-commands']
body='cd '+shlex.quote(remote)+' && timeout --signal=TERM --kill-after=5s 895s '+shlex.join(args)
command=['ssh','-o','BatchMode=yes','-o','ConnectTimeout=10','alghul','zsh -lic '+shlex.quote(body)]
(root/'recovery-command.json').write_text(json.dumps({'command':command,'session_id':sid,'cap_seconds':900,'heartbeat_seconds':180,'transport':'Alghul existing authorized Claude runtime; same specified session UUID; local failed session had zero inference'}))
start=time.monotonic()
with (root/'recovery-output.jsonl').open('w') as out,(root/'recovery-stderr.txt').open('w') as err:
 p=subprocess.Popen(command,stdout=out,stderr=err,start_new_session=True)
 beat=180
 while p.poll() is None:
  elapsed=time.monotonic()-start
  if elapsed>=beat:
   print('heartbeat',int(elapsed),'output_bytes',(root/'recovery-output.jsonl').stat().st_size,flush=True);beat+=180
  if elapsed>=900:
   os.killpg(p.pid,signal.SIGTERM)
   try:p.wait(timeout=5)
   except subprocess.TimeoutExpired:os.killpg(p.pid,signal.SIGKILL);p.wait()
   break
  time.sleep(1)
(root/'recovery-execution.json').write_text(json.dumps({'exit_code':p.returncode,'elapsed_seconds':time.monotonic()-start,'stopped':p.poll() is not None,'pid':p.pid}))
print('Recovery reviewer exited',p.returncode,flush=True)
