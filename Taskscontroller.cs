using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API;

[ApiController]
[Route("api/[controller]")] 
public class Taskscontroller (DataContext context) : ControllerBase
{
 [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
      var tasks = await context.Tasks
    .OrderBy(t => t.Priority.ToLower() == "high" ? 1 : t.Priority.ToLower() == "medium" ? 2 : 3)
    .ThenByDescending(t=>t.Id)
    .ToListAsync();
     return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTask(int id)
    {
        var task = await context.Tasks.FindAsync(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

      [HttpPost]
    public async Task<IActionResult> AddTask(AppTask task)
    {

        await context.Tasks.AddAsync(task);
        await context.SaveChangesAsync();

        return  CreatedAtAction(nameof(GetTask),task.Id);

    }
[HttpPut("{id}")]
public async Task<IActionResult> UpdateTask( int id ,[FromBody] AppTask update)
{
    var task = await context.Tasks.FindAsync(id);
   if (task == null) return NotFound();
    
    task.Description = update.Description;
    task.Status = update.Status;
    task.Priority = update.Priority;

    await context.SaveChangesAsync();
    return Ok(task);
}

[HttpDelete("{id}")]
public async Task<IActionResult> DeleteTask(int id)
{
    var task = await context.Tasks.FindAsync(id);
    if (task == null) return NotFound();

    context.Tasks.Remove(task);
    await context.SaveChangesAsync();
    return NoContent();
}

    
}
