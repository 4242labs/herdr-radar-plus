import subprocess,os,signal,time,json,pathlib
R=pathlib.Path('/Users/42piratas/42labs/review-artifacts/pi-model-logo-independent-review/r2');end=1791466391.9146993;remaining=max(0,end-time.time())
cmd=['/Users/42piratas/.local/bin/codex','exec','resume','--ignore-user-config','--ignore-rules','-m','gpt-5.6-sol','--skip-git-repo-check','--json','--output-schema',str(R/'report-schema.json'),'-o',str(R/'report.json'),'01a11bae-a410-7290-816b-44ee920131ff',(R/'sendback-1.txt').read_text()]
with (R/'sendback-1.jsonl').open('w') as out,(R/'sendback-1.err').open('w') as err:
 p=subprocess.Popen(cmd,stdout=out,stderr=err,stdin=subprocess.DEVNULL,start_new_session=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'})
 while p.poll() is None:
  if time.time()>=end:
   os.killpg(p.pid,signal.SIGTERM)
   try:p.wait(timeout=3)
   except subprocess.TimeoutExpired:os.killpg(p.pid,signal.SIGKILL);p.wait()
   break
  time.sleep(1)
 (R/'sendback-process-receipt.json').write_text(json.dumps({'pid':p.pid,'exit_code':p.returncode,'thread_id':'01a11bae-a410-7290-816b-44ee920131ff','deadline_epoch':end,'remaining_seconds':max(0,end-time.time()),'stopped':True},indent=2))
 print(json.dumps({'exit_code':p.returncode,'remaining_seconds':round(max(0,end-time.time())),'stopped':True}),flush=True)
