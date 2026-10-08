import subprocess,sys,time,os,signal,json,pathlib,datetime
R=pathlib.Path('/Users/42piratas/42labs/review-artifacts/pi-model-logo-independent-review/r2'); started=time.monotonic(); deadline=started+600
receipt=R/'deadline.json'
def run(cmd,stem):
 remaining=deadline-time.monotonic()
 if remaining<=0:return None
 with (R/(stem+'.jsonl')).open('w') as out,(R/(stem+'.err')).open('w') as err:
  p=subprocess.Popen(cmd,stdout=out,stderr=err,stdin=subprocess.DEVNULL,start_new_session=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'})
  receipt.write_text(json.dumps({'pid':p.pid,'started_at':datetime.datetime.now().astimezone().isoformat(),'deadline_epoch':time.time()+remaining,'cap_seconds':600,'model_requested':'gpt-5.6-sol'},indent=2))
  beat=time.monotonic()+180
  while p.poll() is None:
   now=time.monotonic()
   if now>=deadline:
    os.killpg(p.pid,signal.SIGTERM)
    try:p.wait(timeout=3)
    except subprocess.TimeoutExpired:os.killpg(p.pid,signal.SIGKILL);p.wait()
    break
   if now>=beat:
    events=[]
    for line in (R/(stem+'.jsonl')).read_text().splitlines():
     try:events.append(json.loads(line))
     except:pass
    items=[e.get('item',{}) for e in events if e.get('type')=='item.completed'];cmds=[i.get('command','') for i in items if i.get('type')=='command_execution']
    print(json.dumps({'progress':stem,'elapsed_seconds':round(now-started),'events':len(events),'completed_commands':len(cmds),'skill_opened':any('skill-review-specs' in c for c in cmds),'failed_commands':sum(i.get('exit_code') not in (0,None) for i in items if i.get('type')=='command_execution')},ensure_ascii=False),flush=True);beat=now+180
   time.sleep(1)
  return p.returncode
cmd=['/Users/42piratas/.local/bin/codex','exec','--ignore-user-config','--ignore-rules','-m','gpt-5.6-sol','-s','read-only','--skip-git-repo-check','-C',str(R),'--json','--output-schema',str(R/'report-schema.json'),'-o',str(R/'report.json'),(R/'brief.txt').read_text()]
code=run(cmd,'run')
# Keep same reviewer available for exact missing-coverage follow-ups while original cap remains.
events=[]
for line in (R/'run.jsonl').read_text().splitlines():
 try:events.append(json.loads(line))
 except:pass
thread=next((e.get('thread_id') for e in events if e.get('type')=='thread.started'),None)
(R/'process-receipt.json').write_text(json.dumps({'exit_code':code,'elapsed_seconds':time.monotonic()-started,'thread_id':thread,'remaining_seconds':max(0,deadline-time.monotonic()),'deadline_epoch':time.time()+max(0,deadline-time.monotonic()),'stopped':True},indent=2))
print(json.dumps({'exit_code':code,'thread_id':thread,'remaining_seconds':round(max(0,deadline-time.monotonic())),'report_exists':(R/'report.json').is_file()},ensure_ascii=False),flush=True)
